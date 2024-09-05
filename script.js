const apiKey = '9SJF3VZEUYVQJF76'; // Replace with your Alpha Vantage API key

async function fetchMovingAverages(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Extract only the 50-Day and 200-Day Moving Averages
        const movingAverages = {
            name: symbol,
            fiftyDayMA: data['50DayMovingAverage'],
            twoHundredDayMA: data['200DayMovingAverage']
        };

        console.log(`Moving Averages for ${symbol}:`, movingAverages); // Debugging log
        return movingAverages;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function fetchADX(symbol) {
    const url = `https://www.alphavantage.co/query?function=ADX&symbol=${symbol}&interval=daily&time_period=14&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const key = `Technical Analysis: ADX`;
        if (data[key]) {
            const firstEntry = Object.values(data[key])[0]; // Get the most recent entry
            return firstEntry['ADX'];
        }
        return 'N/A';
    } catch (error) {
        console.error(`Error fetching ADX for ${symbol}:`, error);
        return 'Error';
    }
}

async function loadMovingAverages() {
    const symbols = ['UNIT', 'AGL', 'EVLV', 'ASPI', 'XRTX', 'VSTA', 'SPWH', 'LGCL', 'ATPC', 'MNTS', 'AIEV', 'ADD', 'FCEL', 'UNCY', 'CTNT', 'SVMH', 'KXIN', 'FFIEW']; // Add more symbols as needed
    const container = document.getElementById('data-container');
    container.style.textAlign = 'center'; // Center the content

    for (const symbol of symbols) {
        const data = await fetchMovingAverages(symbol);
        const data2 = await fetchADX(symbol);        

        if (!data || (!data.fiftyDayMA && !data.twoHundredDayMA)) {
            console.error(`No moving averages data for ${symbol}`);
            continue; // Skip to the next symbol
        }

        // Create a section to display the data
        const dataSection = document.createElement('div');
        dataSection.style.margin = '20px'; // Add some margin
        dataSection.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>50-Day MA:</strong> ${data.fiftyDayMA || 'N/A'}</p>
            <p><strong>200-Day MA:</strong> ${data.twoHundredDayMA || 'N/A'}</p>
            <p><strong>ADX:</strong> ${data2 || 'N/A'}</p>
        `;
        container.appendChild(dataSection);
    }
}

// Call the loadMovingAverages function when the page loads
window.addEventListener('DOMContentLoaded', loadMovingAverages);

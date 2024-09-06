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
            fiftyDayMA: parseFloat(data['50DayMovingAverage']),
            twoHundredDayMA: parseFloat(data['200DayMovingAverage'])
        };

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
            return parseFloat(firstEntry['ADX']);
        }
        return 'N/A';
    } catch (error) {
        console.error(`Error fetching ADX for ${symbol}:`, error);
        return 'Error';
    }
}

async function loadMovingAverages() {
    const symbols = ['UNIT', 'AGL', 'EVLV', 'ASPI', 'XRTX', 'VSTA', 'SPWH', 'LGCL', 'ATPC', 'MNTS', 'AIEV', 'ADD', 'FCEL', 'UNCY', 'CTNT', 'SVMH', 'KXIN', 'FFIEW'];
    const container = document.getElementById('data-container');
    container.style.textAlign = 'center'; // Center the content
    const stockData = [];

    for (const symbol of symbols) {
        const maData = await fetchMovingAverages(symbol);
        const adxData = await fetchADX(symbol);

        if (maData && adxData !== 'N/A') {
            stockData.push({ ...maData, adx: adxData });
        }
    }

    // Sort stock data based on ADX values from highest to lowest
    stockData.sort((a, b) => b.adx - a.adx);

    // Display sorted data
    stockData.forEach(data => {
        // Create a section to display the data
        const dataSection = document.createElement('div');
        dataSection.className = 'card';

        // Apply dark red background if ADX is less than 25
        if (data.adx < 25) {
            dataSection.classList.add('low-adx');
        }
        
        dataSection.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>50-Day MA:</strong> ${data.fiftyDayMA || 'N/A'}</p>
            <p><strong>200-Day MA:</strong> ${data.twoHundredDayMA || 'N/A'}</p>
            <p><strong>ADX:</strong> ${data.adx || 'N/A'}</p>
            ${data.fiftyDayMA > data.twoHundredDayMA 
                ? '<button class="buy-button">BUY</button>' 
                : '<button class="sell-button">SELL</button>'}
        `;
        container.appendChild(dataSection);
    });
}

// Call the loadMovingAverages function when the page loads
window.addEventListener('DOMContentLoaded', loadMovingAverages);

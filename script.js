const apiKey = '9SJF3VZEUYVQJF76'; // Replace with your Alpha Vantage API key

// Function to fetch the Simple Moving Average
async function fetchSMA(symbol, timePeriod) {
    const url = `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=${timePeriod}&series_type=close&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const key = `Technical Analysis: SMA`;
        if (data[key]) {
            const firstEntry = Object.values(data[key])[0]; // Get the most recent entry
            return firstEntry['SMA'];
        }
        return 'N/A';
    } catch (error) {
        console.error(`Error fetching SMA for ${symbol}:`, error);
        return 'Error';
    }
}

// Function to fetch the ADX
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

// Main function to fetch and display the data
async function loadIndicators() {
    const symbols = ['UNIT', 'AGL', 'EVLV', 'ASPI', 'XRTX', 'VSTA', 'SPWH', 'LGCL', 'ATPC', 'MNTS', 'AIEV', 'ADD', 'FCEL', 'UNCY', 'CTNT', 'SVMH', 'KXIN', 'FFIEW']; // Add more symbols as needed
    const container = document.getElementById('data-container');

    for (const symbol of symbols) {
        // Fetch the indicators
        const fiftyDayMA = await fetchSMA(symbol, 50);
        const twoHundredDayMA = await fetchSMA(symbol, 200);
        const adx = await fetchADX(symbol);

        // Create a card layout for each stock
        const card = document.createElement('div');
        card.className = 'card mx-auto mb-4';
        card.style.maxWidth = '400px';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = symbol;

        const fiftyDay = document.createElement('p');
        fiftyDay.className = 'card-text';
        fiftyDay.innerHTML = `<strong>50-Day MA:</strong> ${fiftyDayMA || 'N/A'}`;

        const twoHundredDay = document.createElement('p');
        twoHundredDay.className = 'card-text';
        twoHundredDay.innerHTML = `<strong>200-Day MA:</strong> ${twoHundredDayMA || 'N/A'}`;

        const adxDisplay = document.createElement('p');
        adxDisplay.className = 'card-text';
        adxDisplay.innerHTML = `<strong>ADX:</strong> ${adx || 'N/A'}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(fiftyDay);
        cardBody.appendChild(twoHundredDay);
        cardBody.appendChild(adxDisplay);
        card.appendChild(cardBody);
        container.appendChild(card);
    }
}

// Call the loadIndicators function when the page loads
window.addEventListener('DOMContentLoaded', loadIndicators);

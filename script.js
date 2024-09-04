const apiKey = '9SJF3VZEUYVQJF76'; // Replace with your Alpha Vantage API key

async function fetchAllData(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`All data for ${symbol}:`, data); // Debugging log
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function loadAllData() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL']; // Add more symbols as needed
    const container = document.getElementById('data-container');

    for (const symbol of symbols) {
        const data = await fetchAllData(symbol);
        if (!data) {
            console.error(`No data for ${symbol}`);
            continue;
        }

        // Create a section to display the JSON data
        const dataSection = document.createElement('div');
        dataSection.innerHTML = `
            <h2>Data for ${symbol}</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        container.appendChild(dataSection);
    }
}

loadAllData();

const apiKey = '9SJF3VZEUYVQJF76'; // Replace with your Alpha Vantage API key

async function fetchAllData(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is valid and not empty
        if (!data || Object.keys(data).length === 0) {
            console.error(`No data received for ${symbol}`);
            return null;
        }

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
            continue; // Skip to the next symbol
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

// Call the loadAllData function when the page loads
window.addEventListener('DOMContentLoaded', loadAllData);

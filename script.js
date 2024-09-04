const apiKey = '9SJF3VZEUYVQJF76'; // Replace with your Alpha Vantage API key

async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data['Time Series (Daily)'];
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

async function fetchFinancialData(symbol) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            marketCap: data['MarketCapitalization'],
            peRatio: data['PERatio'],
            pegRatio: data['PEGRatio'],
            debtToEquity: data['DebtEquityRatio']
        };
    } catch (error) {
        console.error('Error fetching financial data:', error);
        return {};
    }
}

function calculateIndicators(data) {
    const prices = Object.values(data).map(d => parseFloat(d['4. close']));
    const adx = calculateADX(prices);
    const ma20 = calculateMA(prices, 20);
    const ma50 = calculateMA(prices, 50);
    const ma200 = calculateMA(prices, 200);

    return { adx, ma20, ma50, ma200 };
}

function calculateADX(prices) {
    // Placeholder function for ADX calculation
    return (Math.random() * 100).toFixed(2);  // Replace with actual calculation
}

function calculateMA(prices, period) {
    if (prices.length < period) return null;
    const ma = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;
    return ma.toFixed(2);
}

async function loadStockData() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL'];  // Add more symbols as needed
    const tableBody = document.getElementById('stock-table').querySelector('tbody');

    for (const symbol of symbols) {
        const data = await fetchStockData(symbol);
        const financials = await fetchFinancialData(symbol);
        if (!data) continue;

        const indicators = calculateIndicators(data);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${symbol}</td>
            <td>${indicators.adx}</td>
            <td>${indicators.ma20}</td>
            <td>${indicators.ma50}</td>
            <td>${indicators.ma200}</td>
            <td>${financials.marketCap || 'N/A'}</td>
            <td>${financials.peRatio || 'N/A'}</td>
            <td>${financials.pegRatio || 'N/A'}</td>
            <td>${financials.debtToEquity || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    }
}

loadStockData();

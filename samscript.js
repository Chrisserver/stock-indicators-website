document.addEventListener('DOMContentLoaded', () => {
    const sampleData = [
        { name: 'UNIT', fiftyDayMA: 12.5, twoHundredDayMA: 10.0, adx: 23.5 },
        { name: 'AGL', fiftyDayMA: 9.0, twoHundredDayMA: 12.0, adx: 24.0 },
        { name: 'EVLV', fiftyDayMA: 15.0, twoHundredDayMA: 14.0, adx: 25.2 },
        { name: 'ASPI', fiftyDayMA: 11.0, twoHundredDayMA: 13.5, adx: 33.1 },
        { name: 'XRTX', fiftyDayMA: 20.0, twoHundredDayMA: 18.0, adx: 40.0 },
    ];

    // Sort data based on ADX from highest to lowest
    sampleData.sort((a, b) => b.adx - a.adx);

    const container = document.getElementById('data-container');
    container.style.textAlign = 'center'; // Center the content

    // Display each stock's data
    sampleData.forEach(data => {
        const dataSection = document.createElement('div');
        dataSection.className = 'card';

        // Apply dark orange background if ADX is less than 25
        if (data.adx < 25) {
            dataSection.classList.add('low-adx');
        }

        dataSection.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>50-Day MA:</strong> ${data.fiftyDayMA}</p>
            <p><strong>200-Day MA:</strong> ${data.twoHundredDayMA}</p>
            <p><strong>ADX:</strong> ${data.adx}</p>
            ${data.fiftyDayMA > data.twoHundredDayMA 
                ? '<button class="buy-button">BUY</button>' 
                : '<button class="sell-button">SELL</button>'}
        `;
        container.appendChild(dataSection);
    });
});

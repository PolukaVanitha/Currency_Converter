const apiKey = 'YOUR_API_KEY';  // Replace with your own API key from a service like exchangerate-api.com or any other

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convert-btn');

    fetch('https://open.exchangerate-api.com/v6/latest')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    convertBtn.addEventListener('click', () => {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = amount.value;

        if (amountValue === '') {
            result.textContent = 'Please enter an amount';
            return;
        }

        fetch(`https://open.exchangerate-api.com/v6/latest?base=${fromValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toValue];
                const convertedAmount = (amountValue * rate).toFixed(2);
                result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
            })
            .catch(error => {
                result.textContent = 'Error fetching the exchange rate';
                console.error('Error:', error);
            });
    });
});

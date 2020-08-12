//DOM Selectors
const currencyElOne = document.getElementById('currency-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElOne = document.getElementById('amount-one');
const amountElTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//The actual function - fetches exchange rates and it updates the DOM
const calculateCurrency = async () => {
    const currencyOne = currencyElOne.value;
    const currencyTwo = currencyElTwo.value;

    const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`);
    const data = await res.json();

    const rate = data.rates[currencyTwo];
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

    amountElTwo.value = (amountElOne.value * rate).toFixed(2);
}

//Event Listeners
currencyElOne.addEventListener('change', calculateCurrency);
amountElOne.addEventListener('input', calculateCurrency);
currencyElTwo.addEventListener('change', calculateCurrency);
amountElTwo.addEventListener('input', calculateCurrency);

swap.addEventListener('click', () => {
    //Just swapping places between the currencies
    const temporary = currencyElOne.value;
    currencyElOne.value = currencyElTwo.value;
    currencyElTwo.value = temporary;
    calculateCurrency();
})

calculateCurrency();
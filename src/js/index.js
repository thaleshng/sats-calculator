async function getBitcoinPrice() {
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    const response = await fetch(url);
    const data = await response.json();
    
    const bitcoinPrice = parseFloat(data.price);
    const satoshiValue = bitcoinPrice / 100000000;
    
    const bitcoinValue = bitcoinPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const satoshiPrice = satoshiValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 6
    });

    const satVb = 0.0845;
    const satVbPrice = satVb.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4
    });

    document.getElementById("bitcoin-value").innerHTML = bitcoinValue;
    document.getElementById("satoshi-conversion").innerHTML = `1 Satoshi ≅ ${satoshiPrice}`;
    document.getElementById("satvb-conversion").innerHTML = `1 sat/vB ≅ ${satVbPrice}`;

    return { satoshiValue, satVb };
}

setInterval(getBitcoinPrice, 10000);

function calculateSatoshi(satoshiValue) { 
    const dolInput = parseFloat(document.getElementById('dol-satoshi').value);
    const satoshiInput = document.getElementById('sat');
        
    if (dolInput === '' || isNaN(dolInput)) {
        satoshiInput.value = '';
        return;
    }

    const satoshiConversion = dolInput / satoshiValue;
    satoshiInput.value = satoshiConversion.toFixed(2);
}

document.getElementById('dol-satoshi').addEventListener('input', async () => {
    const { satoshiValue } = await getBitcoinPrice();
    calculateSatoshi(satoshiValue);
});

function calculateDol(satoshiValue) {
    var satoshiInput = document.getElementById('sat').value;
    var dolInput = document.getElementById('dol-satoshi');
    
    if (satoshiInput === '' || isNaN(satoshiInput)) {
        dolInput.value = '';
        return;
    }
    
    var dolValue = satoshiInput * satoshiValue; 
    dolInput.value = dolValue.toFixed(2);
}

document.getElementById('sat').addEventListener('input', async () => {
    const { satoshiValue } = await getBitcoinPrice();
    calculateDol(satoshiValue);
});

function calculateSatVb(satVb) { 
    const dolInputSatVb = parseFloat(document.getElementById('dol-satvb').value);
    const satvbInpunt = document.getElementById('sat-vb');
        
    if (dolInputSatVb === '' || isNaN(dolInputSatVb)) {
        satvbInpunt.value = '';
        return;
    }

    const satvbConversion = dolInputSatVb / satVb;
    satvbInpunt.value = satvbConversion.toFixed(2);
}

document.getElementById('dol-satvb').addEventListener('input', async () => {
    const { satVb } = await getBitcoinPrice();
    calculateSatVb(satVb);
});

function calculateDolSatVb(satVb) { 
    const satvbInpunt = parseFloat(document.getElementById('sat-vb').value);
    const dolInputSatVb = document.getElementById('dol-satvb');
        
    if (satvbInpunt === '' || isNaN(satvbInpunt)) {
        dolInputSatVb.value = '';
        return;
    }

    const satvbConversionDol = satvbInpunt * satVb;
    dolInputSatVb.value = satvbConversionDol.toFixed(2);
}

document.getElementById('sat-vb').addEventListener('input', async () => {
    const { satVb } = await getBitcoinPrice();
    calculateDolSatVb(satVb);
});

document.getElementById('reset-satoshi').addEventListener('click', function() {
    document.getElementById('dol-satoshi').value = ''; 
    document.getElementById('sat').value = ''; 
});

document.getElementById('reset-sat-vb').addEventListener('click', function() {
    document.getElementById('dol-satvb').value = ''; 
    document.getElementById('sat-vb').value = ''; 
});

getBitcoinPrice();
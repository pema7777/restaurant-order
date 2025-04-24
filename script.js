// Get the table number from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table');

// Display the table number on the page
document.getElementById('table-info').innerText = tableNumber
? `Table No: ${tableNumber}`
: 'Table not detected. Please scan a valid QR.';

// Order form submission function to send data to Google Sheets
function sendOrderToGoogleSheets(item, quantity, price, total) {
const orderData = {
tableNumber: tableNumber,
item: item,
quantity: quantity,
price: price,
total: total
};

fetch('https://script.google.com/macros/s/AKfycbxPTk3VTrvsdylOQS5Z51kFVsZ-uSBHFGppNISfPTjE0fuoJu8xE3d79oQW6Epdr4nS/exec', {
method: 'POST',
body: JSON.stringify(orderData),
headers: {
'Content-Type': 'application/json'
}
})
.then(response => response.json())
.then(data => {
console.log('Order saved to Google Sheets', data);
})
.catch(error => console.error('Error:', error));
}

// Order form handling
document.getElementById('order-form').addEventListener('submit', function(event) {
event.preventDefault();

const item = document.getElementById('item').value;
const quantity = document.getElementById('quantity').value;
const price = document.getElementById('price').value;
const total = quantity * price;

sendOrderToGoogleSheets(item, quantity, price, total);
});

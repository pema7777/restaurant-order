// Parse table number from URL
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table');

document.getElementById('table-info').innerText = tableNumber
? `Table No: ${tableNumber}`
: 'Table not detected. Please scan a valid QR.';

// Handle form submission
document.getElementById('order-form').addEventListener('submit', function (e) {
e.preventDefault();

const item = document.getElementById('item').value;
const qty = document.getElementById('qty').value;

const order = {
table: tableNumber,
item,
qty,
time: new Date().toLocaleTimeString()
};

// For now, just show a confirmation
document.getElementById('confirmation').innerHTML = `
<p><strong>Order Placed!</strong></p>
<p>Item: ${item}</p>
<p>Quantity: ${qty}</p>
<p>Table: ${tableNumber}</p>
`;

// Later: send to Google Sheets or eZee POS via API
console.log("Order:", order);
});
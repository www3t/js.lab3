let transactions = [];

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTransaction();
});

function addTransaction() {
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const category = document.getElementById('transaction-category').value;
    const description = document.getElementById('transaction-description').value;
    const date = new Date().toLocaleString();
    const id = Date.now().toString();

    const transaction = {
        id,
        date,
        amount,
        category,
        description
    };

    transactions.push(transaction);
    addTransactionToTable(transaction);
    calculateTotal();
    document.getElementById('transaction-form').reset();
}

function addTransactionToTable(transaction) {
    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.setAttribute('data-id', transaction.id);
    row.className = transaction.amount >= 0 ? 'income' : 'expense';

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = transaction.id;
    cell2.innerHTML = transaction.date;
    cell3.innerHTML = transaction.category;
    cell4.innerHTML = transaction.description.split(' ').slice(0, 4).join(' ') + '...';
    cell5.innerHTML = `<button onclick="deleteTransaction('${transaction.id}')">Delete</button>`;

    row.addEventListener('click', () => showTransactionDetails(transaction));
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const row = document.querySelector(`[data-id="${id}"]`);
    row.parentNode.removeChild(row);
    calculateTotal();
}

function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').innerText = `Total: ${total}`;
}

function showTransactionDetails(transaction) {
    const details = document.getElementById('transaction-details');
    details.innerHTML = `
        <p>ID: ${transaction.id}</p>
        <p>Date: ${transaction.date}</p>
        <p>Amount: ${transaction.amount}</p>
        <p>Category: ${transaction.category}</p>
        <p>Description: ${transaction.description}</p>
    `;
}

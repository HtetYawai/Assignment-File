const itemInput = document.getElementById('item');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const discountInput = document.getElementById('discount');
const itemsList = document.getElementById('items-list');
const totalPriceElement = document.getElementById('total-price');


// Initialize an object to store tasks by category
let cartItems =[];

// Add a task to the specified category
function addItem() {
    // Take value from input elements.
    const item = itemInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const quantity = parseInt(quantityInput.value.trim(), 10);


    // Check category and task
    if (!item || isNaN(price) || isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid item name, price, and quantity.');
        return;
    }
    
    cartItems.push({ name: item, price: price, quantity: quantity });
    
    itemInput.value = '';
    priceInput.value = '';
    quantityInput.value = 1;

    displayCart();
}

function displayCart() {
    itemsList.innerHTML= '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('task');

        const itemText = document.createElement('span');
        itemText.textContent = `${item.item} - $${item.price.toFixed(2)} x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeItem(index);

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(removeButton);

        total += item.price * item.quantity;

        itemsList.appendChild(itemDiv);

    });
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}


function removeItem(index) {
    cartItems.splice(index, 1);
    displayCart();
}

// Apply discount to the total price
function applyDiscount() {
    const discount = parseFloat(discountInput.value.trim());

    if (isNaN(discount) || discount < 0 || discount > 100) {
        alert('Please enter a valid discount percentage between 0 and 100.');
        return;
    }

    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = total - (total * (discount / 100));

    totalPriceElement.textContent = `Total: $${discountedTotal.toFixed(2)}`;
}
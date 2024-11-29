var plusButtons = document.querySelectorAll(".plus");
var minusButtons = document.querySelectorAll(".minus");
var quantityInputs = document.querySelectorAll(".quantity");
var buyButtons = document.querySelectorAll(".buy");
var unitPrices = document.querySelectorAll(".unit-price");
var cartSubtotal = document.querySelector(".subtotal");
var cartTotal = document.querySelector(".total");
var cartItems = document.querySelector("#cart-items");
var quantities = [
    document.getElementById("qntty1"),
    document.getElementById("qntty2"),
    document.getElementById("qntty3"),
    document.getElementById("qntty4"),
    document.getElementById("qntty5"),
    document.getElementById("qntty6"),
    document.getElementById("qntty7"),
    document.getElementById("qntty8"),
    document.getElementById("qntty9"),
    document.getElementById("qntty10"),
    document.getElementById("qntty11"),
    document.getElementById("qntty12"),
    document.getElementById("qntty13"),
    document.getElementById("qntty14"),
    document.getElementById("qntty15"),
    document.getElementById("qntty16")
];
var prices = [135, 40, 259, 45, 135, 40, 259, 45, 135, 40, 30, 45, 30, 45, 359, 45]; 
var cart = [];
var productNames = [
    "Carthaginian Belt",  
    "Hannibal Poster",  
    "Dido construisant Carthage", 
    "Fall Of Carthage",
    "Romanian Arm Cuff",
    "Roman Tresure Poster",
    "The Battle of Zaama",
    "Fall Of Rome",
    "Amazigh Bin",  
    "Amazigh Poster",  
    "Kohl", 
    "Berber Tattooing",
    "Sebha",
    "Mabkhra",
    "Old Islamic Art",
    "The Quran"
]; 

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateUnitPrice() {
    quantityInputs.forEach((input, index) => {
        let quantity = parseInt(input.value) || 0;
        let price = prices[index] * quantity;
        unitPrices[index].value = price + "DT";
    });
}

function updateCart() {
    updateCartCount();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <button class="remove-item text-red-500 px-3 py-1 border-none text-xs" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    let subtotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    document.querySelector('.subtotal').value = subtotal + 'DT';
    document.querySelector('.total').value = (subtotal + 10) + 'DT';
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            let index = button.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });
}


plusButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        let quantityInput = quantities[index];
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateUnitPrice();
    });
});

minusButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        let quantityInput = quantities[index];
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
        updateUnitPrice();
    });
});

buyButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
        let quantity = parseInt(quantities[index].value) || 0;
        let price = prices[index] * quantity;

        if (quantity > 0) {
            const existingProductIndex = cart.findIndex(item => item.name === productNames[index]);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push({
                    name: productNames[index],
                    quantity: quantity,
                    price: prices[index]
                });
            }
            updateCart();
            const successMessage = button.nextElementSibling;
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
});

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCart(); 
}
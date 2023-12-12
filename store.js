// since we added script line in head section, we need to ensure tha the body is loaded first inorder to execute the js.
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();  // function with all js to run if body is already loaded
}

function ready() {
    // start
    let removeButtons = document.getElementsByClassName('btn-danger')
    console.log(removeButtons);
    for(let i = 0; i < removeButtons.length; i++) {
        let button = removeButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // 3
    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // 5
    let addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(let i = 0; i < addToCartButtons.length; i++) {
        let addButton = addToCartButtons[i];
        addButton.addEventListener('click', addToCartItem);
    }

    // 8
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

// 9: end
function purchaseClicked() {
    alert('Thank you for your purchase');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

// 6
function addToCartItem(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    console.log(imageSrc, title, price);
    addItemToCartRow(title, price, imageSrc);
    updateCartTotal();
}

// 7
function addItemToCartRow(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

// 4
function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

//start 1
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// 2
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];   // All the cart-rows and select the 1st row
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');  // All the cart items or columns of that row
    let total = 0;
    //console.log(cartItemContainer);
    for(let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(priceElement, quantityElement);
        let price = parseFloat(priceElement.innerText.replace('$', ''));  // remove the $ dign and convert ot to a number
        let quantity = quantityElement.value;  // inputs do not have any text only value
        total += (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
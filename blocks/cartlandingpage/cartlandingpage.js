export default function decorate(block) {
// Create elements
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  const stickyCheckout = document.createElement('div');
  stickyCheckout.classList.add('sticky-checkout');
  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Proceed to Checkout';
  stickyCheckout.appendChild(checkoutButton);

  // Cart Title
  const title = document.createElement('h1');
  title.textContent = 'Your Shopping Cart';

  // Empty Cart Message
  const emptyCart = document.createElement('div');
  emptyCart.classList.add('empty-cart');
  const emptyMessage = document.createElement('p');
  emptyMessage.textContent = 'Your cart is empty. Start shopping!';
  const goToShopButton = document.createElement('button');
  goToShopButton.textContent = 'Go to Shop';
  emptyCart.appendChild(emptyMessage);
  emptyCart.appendChild(goToShopButton);

  // Cart items container
  const cartItemsContainer = document.createElement('div');
  cartItemsContainer.classList.add('cart-items');

  // Create total price display
  const cartSummary = document.createElement('div');
  cartSummary.classList.add('cart-summary');
  const totalPriceSpan = document.createElement('p');
  totalPriceSpan.textContent = 'Total: $0.00';
  cartSummary.appendChild(totalPriceSpan);

  // Append everything to the main cart container
  cartContainer.appendChild(stickyCheckout);
  cartContainer.appendChild(title);
  cartContainer.appendChild(emptyCart);
  cartContainer.appendChild(cartItemsContainer);
  cartContainer.appendChild(cartSummary);

  // Append cart container to the body
  block.appendChild(cartContainer);

  // API URL (replace with your actual API endpoint)
  const apiUrl = 'https://api.example.com/cart-items'; // Example API URL

  // Utility function to format currency
  function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  // Function to update total price
  function updateTotalPrice(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      if (item.selected) {
        total += item.price * item.quantity;
      }
    });
    totalPriceSpan.textContent = `Total: ${formatCurrency(total)}`;
  }

  // Function to remove item from cart
  function removeItem(index, cartItems) {
    cartItems.splice(index, 1);
    // renderCartItems(cartItems);
    updateTotalPrice(cartItems);
  }

  // Increase item quantity
  function increaseQuantity(index, cartItems) {
    cartItems[index].quantity += cartItems[index].quantity;
    // renderCartItems(cartItems);
    updateTotalPrice(cartItems);
  }

  // Decrease item quantity
  function decreaseQuantity(index, cartItems) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= cartItems[index].quantity;
      //   renderCartItems(cartItems);
      updateTotalPrice(cartItems);
    }
  }

  // Function to render cart items
  function renderCartItems(cartItems) {
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      // Item select (checkbox)
      const itemSelect = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.selected;
      checkbox.addEventListener('change', () => {
        item.selected = checkbox.checked;
        updateTotalPrice(cartItems);
      });
      itemSelect.appendChild(checkbox);

      // Item image
      const itemImage = document.createElement('div');
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = 'Product image';
      itemImage.appendChild(img);

      // Item details
      const itemDetails = document.createElement('div');
      const itemName = document.createElement('h3');
      itemName.textContent = item.name;
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description;
      const itemPrice = document.createElement('p');
      itemPrice.textContent = formatCurrency(item.price);
      itemDetails.appendChild(itemName);
      itemDetails.appendChild(itemDescription);
      itemDetails.appendChild(itemPrice);

      // Item actions
      const itemActions = document.createElement('div');
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeItem(index, cartItems));

      const viewButton = document.createElement('button');
      viewButton.textContent = 'View Details';
      viewButton.addEventListener('click', () => console.log(`Viewing details of ${item.name}`)); // Replaced alert

      // Quantity controls
      const quantityControls = document.createElement('div');
      const minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.disabled = item.quantity <= 1;
      minusButton.addEventListener('click', () => decreaseQuantity(index, cartItems));
      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = item.quantity;
      const plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.addEventListener('click', () => increaseQuantity(index, cartItems));

      quantityControls.appendChild(minusButton);
      quantityControls.appendChild(quantitySpan);
      quantityControls.appendChild(plusButton);

      itemActions.appendChild(removeButton);
      itemActions.appendChild(viewButton);
      itemActions.appendChild(quantityControls);

      // Append all parts to cart item
      cartItem.appendChild(itemSelect);
      cartItem.appendChild(itemImage);
      cartItem.appendChild(itemDetails);
      cartItem.appendChild(itemActions);

      cartItemsContainer.appendChild(cartItem);
    });
  }

  // Checkout button event
  checkoutButton.addEventListener('click', () => console.log('Proceeding to checkout!')); // Replaced alert

  // Fetch cart items from API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if cart is empty
      if (data.length === 0) {
        emptyCart.style.display = 'block'; // Show empty cart message
      } else {
        emptyCart.style.display = 'none'; // Hide empty cart message
        renderCartItems(data); // Render items from API
        updateTotalPrice(data); // Update total price
      }
    })
    .catch((error) => {
      console.error('Error fetching cart items:', error);
    });
}

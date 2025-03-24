export default function decorate(block) {
  const apiUrl = 'https://dummyjson.com/products?limit=5';
  let cartItems = [];

  // Function to format currency
  function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  // Function to calculate the total price (sum of selected items only)
  function calculateTotalPrice() {
    return cartItems.reduce((sum, item) => {
      if (item.selected) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
  }

  // Function to render cart items dynamically
  function renderCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    const totalPriceElement = document.getElementById('totalPrice');

    cartItemsList.innerHTML = ''; // Clear the list first

    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('cart-item');

      const itemSelectDiv = document.createElement('div');
      itemSelectDiv.classList.add('item-select');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.selected; // Make sure all items are selected by default
      checkbox.addEventListener('click', () => {
        item.selected = !item.selected;
        renderCartItems(); // Re-render the cart items when selection changes
      });
      itemSelectDiv.appendChild(checkbox);
      li.appendChild(itemSelectDiv);

      const itemImageDiv = document.createElement('div');
      itemImageDiv.classList.add('item-image');
      const img = document.createElement('img');
      img.src = item.images;
      img.alt = 'Product image';
      itemImageDiv.appendChild(img);
      li.appendChild(itemImageDiv);

      const itemDetailsDiv = document.createElement('div');
      itemDetailsDiv.classList.add('item-details');
      const itemName = document.createElement('h3');
      itemName.textContent = item.name;
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description;
      const itemPrice = document.createElement('p');
      itemPrice.textContent = formatCurrency(item.price);
      itemDetailsDiv.appendChild(itemName);
      itemDetailsDiv.appendChild(itemDescription);
      itemDetailsDiv.appendChild(itemPrice);
      li.appendChild(itemDetailsDiv);

      const itemActionsDiv = document.createElement('div');
      itemActionsDiv.classList.add('item-actions');

      // Remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        cartItems.splice(index, 1);
        renderCartItems(); // Re-render after removal
      });
      itemActionsDiv.appendChild(removeButton);

      // View details button
      const viewDetailsButton = document.createElement('button');
      viewDetailsButton.textContent = 'View Details';
      viewDetailsButton.addEventListener('click', () => {
        alert(`Viewing details for ${item.name}`);
      });
      itemActionsDiv.appendChild(viewDetailsButton);

      // Quantity controls
      const quantityControlsDiv = document.createElement('div');
      quantityControlsDiv.classList.add('quantity-controls');
      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      decreaseButton.disabled = item.quantity <= 1;
      decreaseButton.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= item.quantity;
          renderCartItems(); // Re-render after quantity change
        }
      });
      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = item.quantity;
      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', () => {
        item.quantity += item.quantity;
        renderCartItems(); // Re-render after quantity change
      });

      quantityControlsDiv.appendChild(decreaseButton);
      quantityControlsDiv.appendChild(quantitySpan);
      quantityControlsDiv.appendChild(increaseButton);

      itemActionsDiv.appendChild(quantityControlsDiv);
      li.appendChild(itemActionsDiv);

      cartItemsList.appendChild(li);
    });

    totalPriceElement.textContent = formatCurrency(calculateTotalPrice()); // Update total price

    // Toggle visibility of cart items and empty cart message
    document.getElementById('cartItemsContainer').style.display = cartItems.length > 0 ? 'block' : 'none';
    document.getElementById('emptyCartMessage').style.display = cartItems.length === 0 ? 'block' : 'none';
  }

  // Function to create the cart page dynamically
  function createCartPage() {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');

    // Sticky Checkout Button
    const stickyCheckout = document.createElement('div');
    stickyCheckout.classList.add('sticky-checkout');
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.addEventListener('click', () => {
      alert('Proceeding to checkout!');
    });
    stickyCheckout.appendChild(checkoutButton);
    cartContainer.appendChild(stickyCheckout);

    // Heading
    const heading = document.createElement('h1');
    heading.textContent = 'Your Shopping Cart';
    cartContainer.appendChild(heading);

    // Empty Cart Message
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.id = 'emptyCartMessage';
    emptyCartMessage.classList.add('empty-cart');
    emptyCartMessage.style.display = 'none'; // Hidden by default
    const emptyCartText = document.createElement('p');
    emptyCartText.textContent = 'Your cart is empty. Start shopping!';
    const goToShopButton = document.createElement('button');
    goToShopButton.textContent = 'Go to Shop';
    goToShopButton.addEventListener('click', () => {
      alert('Redirecting to shopping page...');
    });
    emptyCartMessage.appendChild(emptyCartText);
    emptyCartMessage.appendChild(goToShopButton);
    cartContainer.appendChild(emptyCartMessage);

    // Cart Items Container
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cartItemsContainer';
    cartItemsContainer.style.display = 'none'; // Hidden by default

    // Cart Items List
    const cartItemsList = document.createElement('ul');
    cartItemsList.id = 'cartItemsList';
    cartItemsContainer.appendChild(cartItemsList);
    cartContainer.appendChild(cartItemsContainer);

    // Cart Summary
    const cartSummary = document.createElement('div');
    cartSummary.classList.add('cart-summary');
    const totalText = document.createElement('p');
    totalText.textContent = 'Total: ';
    const totalPrice = document.createElement('span');
    totalPrice.id = 'totalPrice';
    totalText.appendChild(totalPrice);
    cartSummary.appendChild(totalText);
    cartContainer.appendChild(cartSummary);

    // Append cart container to the body
    block.appendChild(cartContainer);
  }

  // Function to fetch and load cart items (API call)
  function fetchCartItems() {
    fetch(apiUrl) // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => {
        // Assume the API returns the products in a format similar to the example below
        cartItems = data.products.map((item) => ({
          ...item,
          quantity: 1,
          selected: true, // All items are selected by default
        }));
        renderCartItems();
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        alert('There was an error fetching the cart data.');
      });
  }

  // Initialize the page by creating the cart structure
  createCartPage();

  // Load cart items from the API
  fetchCartItems();
}

import {
  div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const container = div({ class: 'toggle-container' });
  const leftSide = div({ class: ' toggle-left' });
  const rightSide = div({ class: 'toggle-right' });

  const heading = block.querySelector('p');
  if (heading) {
    heading.classList.add('toggle-heading');
    leftSide.append(heading);
  }

  const list = block.querySelector('ul');
  const items = list ? list.querySelectorAll('li') : [];

  async function fetchAndShowData(category) {
    try {
      rightSide.innerHTML = '';

      const loading = div({ class: 'loading' });
      loading.textContent = 'Loading...';
      rightSide.append(loading);

      const validcategory = ['fragrance', 'groceries', 'home-decoration', 'skincare'];
      if (!validcategory.includes(category)) {
        throw new Error('invalid category');
      }

      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`failed tofetch data:${category}`);
      }

      const data = await response.json();
      const { products } = data;

      rightSide.innerHTML = '';

      if (!products || products.length === 0) {
        const nocontent = div({ class: 'no products found for this category' });
        rightSide.append(nocontent);
        return;
      }

      products.forEach((product) => {
        const content = div({ class: 'toggle-content' });
        content.innerHTML = `<h4> ${product.title}</h4> 
                <p> ${product.description}</p>
                <p><strong> price: </strong> $${product.price}</p>`;

        rightSide.append(content);
      });
    } catch (error) {
      rightSide.innerHTML = '';
      const errorDiv = div({ class: 'toggle-content' });
      errorDiv.textContent = 'Error fetching data';
      rightSide.append(errorDiv);
    }
  }

  items.forEach((item) => {
    item.classList.add('toggle-items');
    item.addEventListener('click', () => {
      const category = item.textContent.trim().toLowerCase();
      fetchAndShowData(category);
    });

    leftSide.append(item);
  });

  container.append(leftSide, rightSide);
  block.innerHTML = '';
  block.append(container);
}

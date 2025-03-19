async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error getting data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'container';

  fetchData('https://fakestoreapi.com/products').then((data) => {
    data.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = `${item.image}`;
      img.alt = 'User image';
      img.className = 'card-image';

      const cardTitle = document.createElement('h1');
      cardTitle.textContent = item.category;
      cardTitle.className = 'card-title';

      const cardText = document.createElement('p');
      cardText.textContent = item.description;
      cardText.className = 'card-text';

      const cardPrice = document.createElement('p');
      cardPrice.textContent = item.price;
      cardPrice.className = 'card-text';

      // const button = document.createElement('button');
      // button.textContent = 'View Profile';
      // button.className = 'card-button';

      // Append elements
      card.appendChild(img);
      card.appendChild(cardTitle);
      card.appendChild(cardText);
      card.appendChild(cardPrice);
      container.appendChild(card);
    });

    block.appendChild(container);
  }).catch((error) => {
    console.error('Error creating cards:', error);
  });
}

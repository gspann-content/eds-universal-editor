export default function decorate(block) {
  const card = document.createElement('div');
  card.className = 'card';

  // Create the image element

  const container = block.querySelector('div');
  const contentContainer = container.querySelector('div');
  const image = contentContainer.querySelector('picture > img');
  const img = document.createElement('img');
  img.src = image.src;
  img.alt = 'Image';
  img.className = 'card-image';

  // Create the content container
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  // Create the title
  const title = document.createElement('h3');
  title.textContent = 'Card Title';

  // Create the paragraph
  const description = document.createElement('p');
  description.textContent = 'This is a simple card with text and an image.';

  // Append the elements to the content container
  cardContent.appendChild(title);
  cardContent.appendChild(description);

  // Append the image and content to the card
  card.appendChild(img);
  card.appendChild(cardContent);

  block.textContent = '';
  block.append(card);
}

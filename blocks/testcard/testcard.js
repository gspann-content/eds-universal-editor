export default function decorate(block) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Create the image element
  const blockContainer = block.querySelector('div');
  const innerContainer = blockContainer.querySelector('div');

  // Handle the background image setup
  const backgroundImage = innerContainer.querySelector('picture');
  backgroundImage.classList.add('card-image');
  // Create the content container
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

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
  card.appendChild(backgroundImage);
  card.appendChild(cardContent);

  block.textContent = '';
  block.append(card);
}

export default function decorate(block) {
  // Create card container
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  // Create card
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', 'flipCard');

  // Create card inner
  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  // Create front of the card
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.innerHTML = '<h2>Front</h2><p>Click to Flip</p>';

  // Create back of the card
  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.innerHTML = '<h2>Back</h2><p>Flipped!</p>';

  // Append front and back to the card inner
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  // Append card inner to the card
  card.appendChild(cardInner);

  // Append card to the card container
  cardContainer.appendChild(card);

  // Append the card container to the body of the document
  document.body.appendChild(cardContainer);

  // Add event listener to flip the card
  card.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
  });

  block.textContent = '';
  block.append(cardContainer);
}

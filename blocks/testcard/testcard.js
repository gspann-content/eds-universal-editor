export default function decorate(block) {
  const flipCard = document.createElement('div');
  flipCard.classList.add('flip-card');

  // Create the inner container for the flip card
  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');

  // Create the front of the card
  const flipCardFront = document.createElement('div');
  flipCardFront.classList.add('flip-card-front');

  const frontTitle1 = document.createElement('h2');
  frontTitle1.textContent = 'Front Card';
  flipCardFront.appendChild(frontTitle1);

  const frontText1 = document.createElement('p');
  frontText1.textContent = 'This is the front side of the flip card.';
  flipCardFront.appendChild(frontText1);

  // Create the back of the card
  const flipCardBack = document.createElement('div');
  flipCardBack.classList.add('flip-card-back');

  const backTitle = document.createElement('h2');
  backTitle.textContent = 'Back Card';
  flipCardBack.appendChild(backTitle);

  const backText = document.createElement('p');
  backText.textContent = 'This is the back side of the flip card.';
  flipCardBack.appendChild(backText);

  // Append the front and back sides to the inner container
  flipCardInner.appendChild(flipCardFront);
  flipCardInner.appendChild(flipCardBack);

  // Append the inner container to the outer flip card container
  flipCard.appendChild(flipCardInner);

  // Add the event listener for clicking to flip the card
  flipCard.addEventListener('click', () => {
    flipCardInner.classList.toggle('flipped');
  });

  // Append the flip card to the DOM
  block.textContent = '';
  block.append(flipCard);
}

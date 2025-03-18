export default function decorate(block) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');
    
    // Create the inner container for the flip card
    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');
    
    // Create the front of the card
    const flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front');
    
    const frontTitle = document.createElement('h2');
    frontTitle.textContent = 'Front Card';
    flipCardFront.appendChild(frontTitle);
    
    const frontText = document.createElement('p');
    frontText.textContent = 'This is the front side of the flip card.';
    flipCardFront.appendChild(frontText);
    
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
    
    // Append the flip card to the DOM
        block.textContent = '';
        block.append(cardContainer);
    // Add the event listener for clicking to flip the card
    flipCard.addEventListener('click', function() {
      flipCardInner.classList.toggle('flipped');
    });
 
}

export default function decorate(block) {
  const testCard = document.createElement('div');
  testCard.className = 'test-card';
  block.textContent = '';
  block.appendChild(testCard);
}

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  // Create the text div
  const textDiv = document.createElement('div');
  textDiv.classList.add('text');
  textDiv.innerText = 'Hello World'; // Set the text inside the div

  // Append the text div to the overlay
  overlay.appendChild(textDiv);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'overlays-overlay-image';
      else div.className = 'overlays-overlay-body';
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  ul.append(overlay);
  block.textContent = '';
  block.append(ul);
}

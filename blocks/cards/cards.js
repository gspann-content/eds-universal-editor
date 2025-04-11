import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import {ul, li, img, div} from '../../scripts/dom-builder.js';

export default function decorate(block) {

  const ulElement = ul();

 [...block.children].forEach((row) => {
  const liElement = li();
  const rowDiv = div();

  moveInstrumentation(rowDiv,row);
  while(row.firstElementChild){
    const divElement = div();

    divElement.append(row.firstElementChild);

    if(divElement.children.length === 1 && divElement.querySelector('picture'))
    {
      divElement.className = 'cards-card-image';
    } else {
      divElement.className = 'cards-card-body';
    }
    rowDiv.append(divElement);
  }

  liElement.append(rowDiv);
  ulElement.append(liElement);

  ulElement.querySelectorAll('picture > img').forEach((imgEl) => {
    const optimizedPic = createOptimizedPicture(imgEl.src,imgEl.alt, false, [{width: '750'}]);
    
  });

  moveInstrumentation(imgEl,optimizedPic.querySelector('img'));

  imgEl.closest('picture').replaceWith(optimizedPic);
 });

 block.textContent = '';
 block.appendElement;
}
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  
  /* change to ul, li */
  const ul = document.createElement('ul');
  // create button wrapper and buttons for previous and next for textimonials carousel
  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('buttons');
// prev button
  const prevButton=document.createElement('button');
  prevButton.id="prev";
  prevButton.textContent="<";
  prevButton.addEventListener('click',()=>
  {
    activateCarousel('prev',testimonialsToShow);
  });
  //next button
  const nextButton=document.createElement('button');
  nextButton.id="next";
  nextButton.textContent=">";
  nextButton.addEventListener('click',()=>
    {
      activateCarousel('next',testimonialsToShow);
    });

  buttonsWrapper.appendChild(prevButton);
  buttonsWrapper.appendChild(nextButton);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'testimonial-image';
      else div.className = 'testimonial-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  block.append(buttonsWrapper);
}

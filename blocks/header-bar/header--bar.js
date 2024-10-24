import {
    div
  } from '../../scripts/dom-builder.js';
  
  export default function decorate(block) {
  
    const divs = block.children;
  
    const header = document.createElement('div');
    header.classList.add('header');
  
    const logoDiv = div({
      class: 'logo'
    });
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
  
    Array.from(divs).forEach((div, index) => {
      const picture = div.querySelector('picture');
      const buttonContainer = div.querySelector('.button-container');
  
      const img = picture ? picture.querySelector('img') : null;
      const cta = buttonContainer ? buttonContainer.querySelector('a.button') : null;
  
      if (cta) { 
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
  
        a.href = cta.href;
        a.target = '_blank';
        span.textContent = cta.textContent;
  
        if (img) {
          const newimg = document.createElement('img');
          newimg.src = img.src;
          newimg.alt = img.alt;
  
          if (index === 0) {
            const logoLink = document.createElement('a');
            logoLink.href = cta.href;
            logoLink.target = '_blank';
            logoLink.appendChild(newimg);
            logoDiv.appendChild(logoLink);
          } else {
            a.appendChild(newimg);
          }
        }
  
        if (index >= 2) {
          a.appendChild(span);
          li.appendChild(a);
          ul.appendChild(li);
        }
      }
    });
  
    nav.appendChild(ul);
    header.appendChild(logoDiv);
    header.appendChild(nav);
  
    block.parentElement.style.maxWidth = '100%';
    block.parentElement.style.padding = '0';
  
    block.textContent = '';
    block.append(header);
  }
  
import {
    h1, img,
  } from '../../scripts/dom-builder.js';

  export default function decorate(block) {
    const testpageDiv = div({class: 'testpage'});

    const image = block.querySelector('img');

    if(image) {
        image.classList.add('testpage-image');
        testpageDiv.append(image);
    }

    const text = block.querySelector('h1');

    if(text) {
        text.classList.add('testpage-text');
        testpageDiv.append(text);
    }
    block.innerHTML = '';  //clear the existing content 
    block.append(testpage);
  }


import {
    h1,p, 
  } from '../../scripts/dom-builder.js';

  export default function decorate(block) {
    const testpageDiv = div({class: 'pagging'});


    const title = block.querySelector('h1');
    const text = block.querySelector('p');

    if(title) {
        text.classList.add('pagging-title');
        testpageDiv.append(text);
    }

    if(text) {
        text.classList.add('pagging-text');
        testpageDiv.append(text);
    }

    block.innerHTML = '';  //clear the existing content 
    block.append(testpage);
  }
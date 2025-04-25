import {
    h1, p, div, ul, li,h3,h6,button
  } from '../../scripts/dom-builder.js';

   export default  async function decorate(block) {
    const testpageDiv = div({class:' mainContainer'});

    const title = block.querySelector('h1');
    const text = block.querySelector('p');

    const titleDiv = div({class: 'titleContainer '});
    const textDiv = div({class: 'textContainer '});

    if(title) {
        title.classList.add = 'titleCarousel ';
        titleDiv.append(title);
    }

    if(text) {
        text.classList.add = 'textCarousel';
        textDiv.append(text);
    }

    testpageDiv.append(titleDiv,textDiv);
    block.append(testpageDiv);



    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';

    const cardTrack = document.createElement('div');
    cardTrack.className = 'carousel-track';

    data.products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'carousel-card';

      const title = document.createElement('h2');
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.textContent = product.description;

        const btn = document.createElement('button');
        btn.innerHTML = "View Details";
        btn.classList.add('button');

        card.append(title,desc,btn);
        cardTrack.appendChild(card);
    });

    const cardHeadDiv = document.createElement('div');
    cardHeadDiv.classList.add('card-head-div');

    const heading = document.createElement('h5');
    heading.classList.add('cardHeading');
    heading.innerHTML = "Top Selling Products";

    const browsebtn = document.createElement('button');
    browsebtn.innerHTML = "Browse 200 Products ->";
    browsebtn.classList.add('browse-button');


    const arrows = div({class: 'carousel-arrows'});

    const leftBtn = button({class: ' slide-button' , id: 'carousel-left-btn'});

    const leftIcon = document.createElement('img');
    leftIcon.src = '/icons/left-icon.svg';
    leftIcon.classList.add('left-icon');
    leftBtn.appendChild(leftIcon);


    const rightBtn = button({class: 'slide-button', id: 'carousel-right-btn'});

    const rightIcon = document.createElement('img');
    rightIcon.src = '/icons/right-icon.svg';
    rightIcon.classList.add('right-icon');
    rightBtn.appendChild(rightIcon);

   arrows.appendChild(leftBtn);
   arrows.appendChild(rightBtn);

   cardHeadDiv.append(heading, browsebtn);
   cardHeadDiv.append(arrows);
   carouselWrapper.append(cardHeadDiv, cardTrack);

   const scrollAmount = 300;

   leftBtn.addEventListener('click', () => {
    cardTrack.scrollLeft -= scrollAmount;

   }); 
   rightBtn.addEventListener('click', () => {
    cardTrack.scrollLeft += scrollAmount;
   });

   block.appendChild(carouselWrapper);

  }
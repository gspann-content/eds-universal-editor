import {
    h1, p, div, ul, li,h3
  } from '../../scripts/dom-builder.js';

   export default  async function decorate(block) {
    const testpageDiv = div({class: 'global-text-center'});

    const title = block.querySelector('h1');
    const text = block.querySelector('p');
  

    if(title) {
        title.className = 'global-text-2xl';
        testpageDiv.append(title);
    }

    if(text) {
        text.className = 'text-center';
        testpageDiv.append(text);
    }

    block.append(testpageDiv);

    const cardContainer = div ({class :' global-bg-grey-100 global-flex global-flex-wrap global-gap-x-[25px] global-p-4 global-border global-border-[#ccc] '});

    try {
     const res = await fetch('https://dummyjson.com/products'); //to fetch data 
      const data =  await res.json(); 
      console.log(data);

      data.products.forEach(product => {    // to access each data 
        const productDiv = div({class :'global-w-3/12 global-gap-x[25px] global-gap-4'});
      

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productTitle.className = 'font-bold text-xl';

        const productDesc = document.createElement('p');
        productDesc.textContent = product.description;
        productDesc.className = "font-normal text-center border-2";

        const productCategory = document.createElement('h6');
        productCategory.textContent = product.category;
        productCategory.className = "font-normal text-center border-2";

        // const productImage = document.createElement('img');
        // productImage.src = imageUrl;


        productDiv.append(productTitle,productDesc) ;
        cardContainer.append(productDiv);
        testpageDiv.append(cardContainer);

      });

    } catch (error) {
      console.error('error');
    }

    block.innerHTML = '';
    block.append(testpageDiv);
  }
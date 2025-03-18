import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

async function fetchData(url)
{   
    try{
        const response = await fetch(url);
        if(!response.ok)
        {
            throw new Error(`Error getting products: ${response.status}`);
        }
        const data =  await response.json();
        return data;
    }
    catch(error)
    {
        console.error(`An error occured: ${error}`);
    }
}   
export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('products-container');
  
  [...block.children].forEach((row, rowindex) => {
    if(rowindex === 1)
    {   
        const heading = row.querySelector('div > div > p');
        heading.classList.add('heading')
        container.append(heading);
    }
    if(rowindex === 2)
    {   
        const subHeading = row.querySelector('div > div > p');
        subHeading.classList.add('sub-heading')
        container.append(subHeading);
    }
  });
  const productsWrapper = document.createElement('ul');
  const products = fetchData('https://dummyjson.com/products');
  products.then((data)=>
  { 
    data.products.forEach((product)=>
    {   
        const productCard = document.createElement('li');

        const picture = document.createElement('picture');

        const image = document.createElement('img');
        image.src = product.images[0];
        image.width = '150';
        image.height = '150';
        image.loading = 'lazy';

        picture.append(image);

        const title = document.createElement('h3');
        title.textContent = product.title;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('h6');
        price.textContent = `$${product.price}`;

        productCard.append(picture);
        productCard.append(title);
        productCard.append(description);
        productCard.append(price);

        productsWrapper.append(productCard);
    })
    container.append(productsWrapper);
  }).catch((error)=>
  {
    console.log(error);
  });
  block.textContent = '';
  block.append(container);
}

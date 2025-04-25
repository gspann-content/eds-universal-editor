import {
    div, p,
  } from '../../scripts/dom-builder.js';

const baseUrl = 'https://dummyjson.com/products'; 
let allProducts = [];

async function fetchallProducts(baseUrl) {
    try {
        const response = await fetch(baseUrl);
        if(!response.ok) throw new Error(`http error! status' $(response.status)`);
        const json = await response.json();
        return json.products;
    } catch(error) {
        console.error ('Error fetching products:',error);
        return[];
    }
}

function renderProducts(products, cardContainer) {
    cardContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'tab-card';

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;

        const title = document.createElement('h2');
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.textContent = product.description;

        const productPrice = document.createElement('h6');
        productPrice.textContent = product.price;

        card.append(img, title, desc, productPrice);
        cardContainer.appendChild(card);
    });
}

function filterProductByCategory(category,cardContainer) {
    const filtered = category === 'all' ? allProducts : allProducts.filter(p => p.category.toLowerCase().includes(category));
    renderProducts(filtered, cardContainer);

    console.log('categories', category);
    console.log('filtered products', filtered);
    

}

export default async function decorate(block) {

    const heading = block.querySelector('p');
    const headingDiv = div({class: 'heading-div'});

    if(heading) {
        heading.classList.add('tab-heading');
        headingDiv.append(heading);
    }

    const tabContainer = div({class: 'tab-container'});
    tabContainer.append(headingDiv);

    const filterContainer = div({class: 'filter-container'});

    const cardTrack = div({class: 'tab-track'});

    block.append(tabContainer,filterContainer, cardTrack);

    const list = block.querySelector('ul');
    const items = list ? list.querySelectorAll('li') : [];

    items.forEach(item => {
        const button = document.createElement('button');
        const category = item.textContent.trim().toLowerCase().replace(/\s+/g, '_');
        button.textContent = item.textContent.trim();
        button.dataset.category = category;

        button.className = 'filter-button';

        filterContainer.appendChild(button);
    });

    allProducts = await fetchallProducts(baseUrl);

    renderProducts(allProducts, cardTrack);

    filterContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            filterProductByCategory(category,cardTrack);
        });
    });

}














// //fetch api
//   async function fetchProducts() {
//     try {
//       let response = await fetch(baseUrl);
//       let products = await response.json();
//       return products;
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }

//    function renderCards(products) {
//     const productCards= div();
//     productCards.innerHTMl = '';

//     if(!Array.isArray(products))
//         return;

    
    
//     products.forEach((product) => {
//         const card = document.createElement('div');
//         card.className = "track-card";

//         const img = document.createElement('img');
//         img.src = product.thumbnail;
//         img.alt = product.title;

//         const title = document.createElement('h2');
//         title.textContent = product.title;

//         const desc = document.createElement('p');
//         desc.textContent = product.description;

//         const productPrice = document.createElement('h6');
//         productPrice.textContent = product.price;

//         card.append(img, title, desc, productPrice);
//         cardTrack.appendChild(card);

//     });
//     return cardTrack;
// }

//   export default function decorate(block) {

  
//     const heading = block.querySelector('p');
//     const headingDiv = div({class: 'heading-div'});

//     if(heading) {
//         heading.classList.add('tab-heading');
//         headingDiv.append(heading);
//     }

//     const tabContainer = div({class: 'tab-container'});
//     tabContainer.append(headingDiv);

//     // const cardTrack = div({class:'tab-track'});

//     const storedData = fetchProducts();

    
//     const ul = block.querySelector('ul');
//     const items = ul? [...ul.querySelectorAll('li')] : [];
//     if(ul) ul.remove();

//     const filterContainer = div({class: 'filter-container'});
//     block.append(filterContainer);

//     items.forEach((li) => {
//         const button = document.createElement('button');
//         button.textContent = li.textContent.trim();
//         button.className = 'category-button';

//         button.dataset.category = li.textContent.trim().toLowerCase();

//         filterContainer.appendChild(button);

//         renderCards(storedData);
//     })

//     const buttons = filterContainer.querySelectorAll('button');
//     buttons.forEach((btn) => {
//         btn.addEventListener('click', () => {
//             const category = btn.getAttribute('data-category');
//             if(!category) return;
            
//             const filtered = category === 'all' ? storedData : storedData.filter((item) => item.category.toLowerCase() === category);
//             renderProducts(filtered);
//         })
//     })

//     block.append(tabContainer);
//     block.append(filterContainer);
//     storedData.then((data)=> {
//         console.log('products here:',data.products);
//         const productCards =  renderCards(data.products);
//             block.append(productCards);

//     });

// }
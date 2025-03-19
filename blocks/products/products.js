async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error getting products: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('products-container');

  let productsColumns;
  let imageHeight;
  let imageWidth;
  let imageAlignment;
  let headingAlignment;
  let subHeadingAlignment;
  let titleAlignment;
  let descriptionAlignment;
  let priceAlignment;

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 1) {
      const heading = row.querySelector('div > div > p');
      if(heading) {
        heading.classList.add('heading');
        container.append(heading);
      }
    }
    if (rowIndex === 2) {
      const headingPosition = row.querySelector('div > div > p');
      headingAlignment = headingPosition?.textContent || 'center';
    }
    if (rowIndex === 3) {
      const subHeading = row.querySelector('div > div > p');
      if(subHeading) {
        subHeading.classList.add('sub-heading');
        container.append(subHeading);
      }
    }
    if (rowIndex === 4) {
      const subHeadingPosition = row.querySelector('div > div > p');
      subHeadingAlignment = subHeadingPosition?.textContent || 'center';
    }
    if (rowIndex === 5) {
      const columns = row.querySelector('div > div > p');
      productsColumns = columns?.textContent || '4';
    }
    if (rowIndex === 6) {
      const height = row.querySelector('div > div > p');
      imageHeight = height?.textContent || '200';
    }
    if (rowIndex === 7) {
      const width = row.querySelector('div > div > p');
      imageWidth = width?.textContent || '200';
    }
    if (rowIndex === 8) {
      const imagePosition = row.querySelector('div > div > p');
      imageAlignment = imagePosition?.textContent || 'center';
    }
    if (rowIndex === 9) {
      const titlePosition = row.querySelector('div > div > p');
      titleAlignment = titlePosition?.textContent || 'center';
    }
    if (rowIndex === 10) {
      const descriptionPosition = row.querySelector('div > div > p');
      descriptionAlignment = descriptionPosition?.textContent || 'center';
    }
    if (rowIndex === 11) {
      const pricePosition = row.querySelector('div > div > p');
      priceAlignment = pricePosition?.textContent || 'center';
    }
  });
  
  const productsWrapper = document.createElement('ul');
  productsWrapper.classList.add(`products-col-${productsColumns}`);
  const products = fetchData('https://dummyjson.com/products');
  products.then((data) => {
    data.products.forEach((product) => {
      const productCard = document.createElement('li');
      const picture = document.createElement('picture');

      const image = document.createElement('img');
      const [imageSrc] = product.images;
      image.src = imageSrc;
      image.width = imageWidth; 
      image.height = imageHeight;
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
    });
    container.append(productsWrapper);
  }).catch((error) => {
    console.log(error);
  });
  
  document.documentElement.style.setProperty( "--product-image-width", `${imageWidth}px`); 
  document.documentElement.style.setProperty( "--product-image-height", `${imageHeight}px`);
  document.documentElement.style.setProperty( "--product-image-alignment", `${imageAlignment}`);  
  document.documentElement.style.setProperty( "--heading-alignment", `${headingAlignment}`); 
  document.documentElement.style.setProperty( "--sub-heading-alignment", `${subHeadingAlignment}`); 
  document.documentElement.style.setProperty( "--product-title-alignment", `${titleAlignment}`); 
  document.documentElement.style.setProperty( "--product-description-alignment", `${descriptionAlignment}`); 
  document.documentElement.style.setProperty( "--product-price-alignment", `${priceAlignment}`); 

  block.textContent = '';
  block.append(container);
}

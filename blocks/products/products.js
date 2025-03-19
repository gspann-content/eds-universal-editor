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
  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 1) {
      const heading = row.querySelector('div > div > p');
      heading.classList.add('heading');
      container.append(heading);
    }
    if (rowIndex === 2) {
      const subHeading = row.querySelector('div > div > p');
      subHeading.classList.add('sub-heading');
      container.append(subHeading);
    }
    if (rowIndex === 3) {
      const columns = row.querySelector('div > div > p');
      productsColumns = columns.textContent;
    }
    if (rowIndex === 4) {
      const height = row.querySelector('div > div > p');
      imageHeight = height.textContent;
    }
    if (rowIndex === 5) {
      const width = row.querySelector('div > div > p');
      imageWidth = width.textContent;
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

  block.textContent = '';
  block.append(container);
}

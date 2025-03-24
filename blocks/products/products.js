async function fetchData(url, limit, page) {
  try {
    const skip = page === 1 ? '0' : (page * limit);
    const paginatedUrl = `${url}?limit=${limit}&page=${page}&skip=${skip}&select=title,price,description,images`;
    const response = await fetch(paginatedUrl);
    if (!response.ok) {
      throw new Error(`Error getting products: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
function getShortText(text, wordLimit) {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) {
    return text;
  }
  const limitedWords = words.splice(0, wordLimit);
  return `${limitedWords.join(' ')}...`;
}
function loadProducts(url, limit, page, imageHeight, imageWidth, descriptionWordsLimit) {
  const productsWrapper = document.querySelector('#products-list');
  productsWrapper.innerHTML = '';
  const products = fetchData(url, limit, page);
  if (!products) {
    productsWrapper.innerHTML = '<h3>Error loading products...</h3>';
    return;
  }
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
      description.textContent = getShortText(product.description, descriptionWordsLimit);

      const price = document.createElement('h6');
      price.textContent = `$${product.price}`;

      productCard.append(picture);
      productCard.append(title);
      productCard.append(description);
      productCard.append(price);

      productsWrapper.append(productCard);
    });
    const totalPages = Math.ceil(data.total / limit);
    renderPagination(totalPages, url, limit, page, imageHeight, imageWidth, descriptionWordsLimit);
  }).catch((error) => {
    console.log(error);
  });
}

function renderPagination(totalPages, url, limit, currentPage, imageHeight, imageWidth, descriptionWordsLimit) {
  const paginationContainer = document.querySelector('#pagination-container');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i += 1) {
    const span = document.createElement('span');
    span.textContent = i;
    span.disabled = i === currentPage; // Disable current page link
    span.addEventListener('click', () => loadProducts(url, limit, i, imageHeight, imageWidth, descriptionWordsLimit));
    paginationContainer.appendChild(span);
  }
}
export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('products-section');

  const properties = {
    productsColumns: '4',
    imageHeight: '',
    imageWidth: '',
    imageAlignment: 'center',
    headingAlignment: 'center',
    headingFontSize: 'large',
    subHeadingAlignment: 'center',
    subHeadingFontSize: 'large',
    titleAlignment: 'center',
    titleFontSizet: 'large',
    descriptionAlignment: 'center',
    descriptionFontSize: 'large',
    descriptionWordsLimit: '15',
    priceAlignment: 'center',
    priceFontSize: 'large',
  };
  [...block.children].forEach((row, rowIndex) => {
    const fieldValue = row.querySelector('div > div > p');
    switch (rowIndex) {
      case 1:
        if (fieldValue) {
          fieldValue.classList.add('heading');
          container.append(fieldValue);
        }
        break;
      case 2: properties.headingAlignment = fieldValue?.textContent || 'center'; break;
      case 3: properties.headingFontSize = fieldValue?.textContent || 'center'; break;
      case 4:
        if (fieldValue) {
          fieldValue.classList.add('sub-heading');
          container.append(fieldValue);
        }
        break;
      case 5: properties.subHeadingAlignment = fieldValue?.textContent || 'center'; break;
      case 6: properties.subHeadingFontSize = fieldValue?.textContent || 'center'; break;
      case 7: properties.productsColumns = fieldValue?.textContent || '4'; break;
      case 8: properties.imageHeight = fieldValue?.textContent || '200'; break;
      case 9: properties.imageWidth = fieldValue?.textContent || '200'; break;
      case 10: properties.imageAlignment = fieldValue?.textContent || 'center'; break;
      case 11: properties.titleAlignment = fieldValue?.textContent || 'center'; break;
      case 12: properties.titleFontSizet = fieldValue?.textContent || 'large'; break;
      case 13: properties.descriptionAlignment = fieldValue?.textContent || 'center'; break;
      case 14: properties.descriptionFontSize = fieldValue?.textContent || 'small'; break;
      case 15: properties.descriptionWordsLimit = fieldValue?.textContent || '10'; break;
      case 16: properties.priceAlignment = fieldValue?.textContent || 'center'; break;
      case 17: properties.priceFontSize = fieldValue?.textContent || 'small'; break;
      default: break;
    }
  });

  block.innerHTML = '';

  document.documentElement.style.setProperty('--product-image-width', `${properties.imageWidth}px`);
  document.documentElement.style.setProperty('--product-image-height', `${properties.imageHeight}px`);
  document.documentElement.style.setProperty('--product-image-alignment', `${properties.imageAlignment}`);
  document.documentElement.style.setProperty('--heading-alignment', `${properties.headingAlignment}`);
  document.documentElement.style.setProperty('--heading-font-size', `${properties.headingFontSize}`);
  document.documentElement.style.setProperty('--sub-heading-alignment', `${properties.subHeadingAlignment}`);
  document.documentElement.style.setProperty('--sub-heading-font-size', `${properties.subHeadingFontSize}`);
  document.documentElement.style.setProperty('--product-title-alignment', `${properties.titleAlignment}`);
  document.documentElement.style.setProperty('--product-title-font-size', `${properties.titleFontSizet}`);
  document.documentElement.style.setProperty('--product-description-alignment', `${properties.descriptionAlignment}`);
  document.documentElement.style.setProperty('--product-description-font-size', `${properties.descriptionFontSize}`);
  document.documentElement.style.setProperty('--product-price-alignment', `${properties.priceAlignment}`);
  document.documentElement.style.setProperty('--product-price-font-size', `${properties.priceFontSize}`);

  const productsList = document.createElement('ul');
  productsList.classList.add(`products-col-${properties.productsColumns}`);
  productsList.id = 'products-list';

  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination-container';

  container.append(productsList, paginationContainer);

  block.append(container);

  const url = 'https://dummyjson.com/products';
  const limit = 16;
  const page = 1;
  loadProducts(url, limit, page, properties.imageHeight, properties.imageWidth, properties.descriptionWordsLimit);
}

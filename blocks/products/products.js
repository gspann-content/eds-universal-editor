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
function renderPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i += 1) {
    const span = document.createElement('span');
    span.textContent = i;
    span.disabled = i === currentPage; // Disable current page link
    // span.addEventListener('click', () => fetchData(i));
    paginationContainer.appendChild(span);
  }
}
function getShortText(text, wordLimit) {
  const words = text.split(/\s+/);
  console.table(words.length, wordLimit);
  if (words.length <= wordLimit) {
    return text;
  }
  const limitedWords = words.splice(0, wordLimit);
  return `${limitedWords.join(' ')}...`;
}
function loadProducts(url, limit, page, productsColumns, imageHeight, imageWidth, descriptionWordsLimit, container) {
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination-container';

  const productsWrapper = document.createElement('ul');
  productsWrapper.classList.add(`products-col-${productsColumns}`);
  const products = fetchData(url, limit, page);
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
    container.append(productsWrapper);
    container.append(paginationContainer);
    const totalPages = Math.ceil(data.total / limit);
    renderPagination(page, totalPages);
  }).catch((error) => {
    console.log(error);
  });
}
export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('products-container');

  let productsColumns;
  let imageHeight;
  let imageWidth;
  let imageAlignment;
  let headingAlignment;
  let headingFontSize;
  let subHeadingAlignment;
  let subHeadingFontSize;
  let titleAlignment;
  let titleFontSizet;
  let descriptionAlignment;
  let descriptionFontSize;
  let descriptionWordsLimit;
  let priceAlignment;
  let priceFontSize;

  [...block.children].forEach((row, rowIndex) => {
    const fieldValue = row.querySelector('div > div > p');
    if (rowIndex === 1) {
      if (fieldValue) {
        fieldValue.classList.add('heading');
        container.append(fieldValue);
      }
    }
    if (rowIndex === 2) {
      headingAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 3) {
      headingFontSize = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 4) {
      if (fieldValue) {
        fieldValue.classList.add('sub-heading');
        container.append(fieldValue);
      }
    }
    if (rowIndex === 5) {
      subHeadingAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 6) {
      subHeadingFontSize = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 7) {
      productsColumns = fieldValue?.textContent || '4';
    }
    if (rowIndex === 8) {
      imageHeight = fieldValue?.textContent || '200';
    }
    if (rowIndex === 9) {
      imageWidth = fieldValue?.textContent || '200';
    }
    if (rowIndex === 10) {
      imageAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 11) {
      titleAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 12) {
      titleFontSizet = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 13) {
      descriptionAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 14) {
      descriptionFontSize = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 15) {
      descriptionWordsLimit = fieldValue?.textContent || '10';
    }
    if (rowIndex === 16) {
      priceAlignment = fieldValue?.textContent || 'center';
    }
    if (rowIndex === 17) {
      priceFontSize = fieldValue?.textContent || 'center';
    }
  });

  const url = 'https://dummyjson.com/products';
  const limit = 16;
  const page = 1;

  loadProducts(url, limit, page, productsColumns, imageHeight, imageWidth, descriptionWordsLimit, container);

  document.documentElement.style.setProperty('--product-image-width', `${imageWidth}px`);
  document.documentElement.style.setProperty('--product-image-height', `${imageHeight}px`);
  document.documentElement.style.setProperty('--product-image-alignment', `${imageAlignment}`);
  document.documentElement.style.setProperty('--heading-alignment', `${headingAlignment}`);
  document.documentElement.style.setProperty('--heading-font-size', `${headingFontSize}`);
  document.documentElement.style.setProperty('--sub-heading-alignment', `${subHeadingAlignment}`);
  document.documentElement.style.setProperty('--sub-heading-font-size', `${subHeadingFontSize}`);
  document.documentElement.style.setProperty('--product-title-alignment', `${titleAlignment}`);
  document.documentElement.style.setProperty('--product-title-font-size', `${titleFontSizet}`);
  document.documentElement.style.setProperty('--product-description-alignment', `${descriptionAlignment}`);
  document.documentElement.style.setProperty('--product-description-font-size', `${descriptionFontSize}`);
  document.documentElement.style.setProperty('--product-price-alignment', `${priceAlignment}`);
  document.documentElement.style.setProperty('--product-price-font-size', `${priceFontSize}`);

  block.textContent = '';
  block.append(container);
}

import {
  div,
  img,
  span,
  a
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  console.log("block.......")
  console.log(block)
  const productCardWrapper = div({
    class: 'product-card-wrapper'
  });

  const [
    productImage,
    productContent,
    productDescription,
    productLink,
    linkLabel,
    linkIcon
  ] = block.children;

  const imageSrc = productImage?.querySelector('img')?.src || '';
  const imageAlt = productImage?.querySelector('img')?.alt || 'Product Image';
  const title = productTitle?.textContent.trim() || '';
  const description = productDescription?.innerHTML.trim() || '';
  const link = productLink?.querySelector('a')?.href || '#';
  const linkText = linkLabel?.textContent.trim() || '';
  const icon = linkIcon?.textContent.trim() || '';

  const productImageElement = img({
    src: imageSrc,
    alt: imageAlt,
    class: 'product-image'
  });

  console.log("title.......")
  console.log(title)

  const productTitleElement = span({
    class: 'product-title'
  }, title);

  

  const productDescriptionElement = div({
    class: 'product-description'
  }, description);

  const productLinkElement = a({
    href: link,
    class: 'product-link'
  }, linkText, span({
    class: 'product-link-icon'
  }, icon));

  const contentDiv = div({
    class: 'product-content'
  },
    productTitleElement,
    productDescriptionElement,
    productLinkElement
  );

  productCardWrapper.append(productImageElement, contentDiv);
  block.innerHTML = '';
  block.append(productCardWrapper);
}
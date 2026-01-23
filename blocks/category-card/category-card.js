import { div, h3, img, p, a } from '../../scripts/dom-builder.js';

const CATEGORY_CARD_WRAPPER_CLASS = 'category-card-wrapper';
const CATEGORY_CARD_IMAGE_CLASS = 'category-card-image';
const CATEGORY_CARD_CONTENT_CLASS = 'category-card-content';
const CATEGORY_CARD_TITLE_CLASS = 'category-card-title';
const CATEGORY_CARD_DESCRIPTION_CLASS = 'category-card-description';
const CATEGORY_CARD_LINK_CLASS = 'category-card-link';

/**
 * Creates a category card block.
 * @param {Object} block - The block object.
 * @returns {HTMLElement} The category card element.
 */
export default function decorate(block) {
  try {
    const categoryCardWrapper = div({ class: CATEGORY_CARD_WRAPPER_CLASS });

    // Extracting content from the first child element (assuming it's the main content container)
    const contentContainer = block.firstElementChild;
    if (!contentContainer) {
      console.error('Category card block is missing content container.');
      return block;
    }

    // Image
    const imageElement = contentContainer.querySelector('img');
    if (imageElement) {
      const imageWrapper = div({ class: CATEGORY_CARD_IMAGE_CLASS });
      const imgTag = img({
        src: imageElement.src,
        alt: imageElement.alt || 'Category image', // Provide a default alt text
        loading: 'lazy',
      });
      imageWrapper.append(imgTag);
      categoryCardWrapper.append(imageWrapper);
    } else {
      console.warn('Category card is missing an image.');
    }

    // Content area
    const contentDivs = Array.from(contentContainer.children).slice(1); // Skip the image div
    const cardContentWrapper = div({ class: CATEGORY_CARD_CONTENT_CLASS });

    contentDivs.forEach((divElement, index) => {
      const textContent = divElement.textContent.trim();

      if (index === 0) { // First content div is likely the title
        const titleElement = divElement.querySelector('div');
        if (titleElement) {
          const h3Tag = h3({ class: CATEGORY_CARD_TITLE_CLASS }, titleElement.textContent.trim());
          cardContentWrapper.append(h3Tag);
        }
      } else if (index === 1) { // Second content div is likely the description
        const descriptionElement = divElement.querySelector('div');
        if (descriptionElement) {
          const pTag = p({ class: CATEGORY_CARD_DESCRIPTION_CLASS }, descriptionElement.textContent.trim());
          cardContentWrapper.append(pTag);
        }
      } else if (index === 2) { // Third content div is likely the link
        const linkElement = divElement.querySelector('div');
        if (linkElement) {
          const linkText = linkElement.textContent.trim();
          // Assuming the link is always "Browse Products →" and doesn't have an href in Figma
          // In a real scenario, you'd likely have an href attribute or a separate field for the URL.
          const aTag = a({ href: '#', class: CATEGORY_CARD_LINK_CLASS, 'aria-label': `Browse products for ${block.querySelector(`.${CATEGORY_CARD_TITLE_CLASS}`)?.textContent || 'this category'}` }, linkText);
          cardContentWrapper.append(aTag);
        }
      }
    });

    categoryCardWrapper.append(cardContentWrapper);
    block.innerHTML = ''; // Clear original content
    block.append(categoryCardWrapper);

  } catch (error) {
    console.error('Error decorating category card block:', error);
    // Optionally, display an error message to the user
    block.innerHTML = '<p class="error-message">Could not load category card.</p>';
  }
}
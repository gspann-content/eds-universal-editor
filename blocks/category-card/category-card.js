import { div, h3, p, a, img } from '../../scripts/dom-builder.js';

/**
 * Transforms the raw DOM into a category card block.
 *
 * @param {HTMLElement} block The raw DOM element representing the block.
 */
export default async function decorate(block) {
  try {
    const categoryCardWrapper = div({ class: 'category-card-wrapper' });

    // Extracting content from the first child element (assuming it contains all the Figma structure)
    const firstChild = block.children[0];
    console.log('Decorating category card block...', block);
    console.log('First child of the block:', firstChild);
    if (!firstChild) {
      console.error('Category card block is missing its primary content.');
      return;
    }

    // Image element
    const imageElement = firstChild.querySelector('img');
    const imageUrl = imageElement?.src || '';
    const imageAlt = imageElement?.alt || 'Category Image'; // Default alt text

    const image = img({
      src: imageUrl,
      alt: imageAlt,
      class: 'category-card-image',
    });

    // Title element
    const titleElement = firstChild.querySelector('div[style*="font-size: 20px"]');
    const titleText = titleElement?.textContent.trim() || '';
    const title = h3({ class: 'category-card-title' }, titleText);

    // Description element
    const descriptionElement = firstChild.querySelector('div[style*="font-size: 16px; font-weight: 200"]');
    const descriptionText = descriptionElement?.textContent.trim() || '';
    const description = p({ class: 'category-card-description' }, descriptionText);

    // Link element
    const linkElement = firstChild.querySelector('div[style*="font-weight: 700"]');
    const linkText = linkElement?.textContent.trim() || '';
    const linkUrl = '#'; // Placeholder, as URL is not directly available in Figma HTML
    const link = a({ class: 'category-card-link', href: linkUrl, 'aria-label': `Learn more about ${titleText}` }, linkText);

    // Assemble the card
    const cardContent = div({ class: 'category-card-content' },
      div({ class: 'category-card-text-container' },
        title,
        description,
      ),
      link,
    );

    categoryCardWrapper.append(image, cardContent);
    block.innerHTML = '';
    block.appendChild(categoryCardWrapper);

  } catch (error) {
    console.error('Error decorating category card block:', error);
    // Optionally, display a user-friendly error message on the block
    block.innerHTML = '<p class="error-message">Could not load category card.</p>';
  }
}

import {
  div, img, h2, p, a,
} from '../../scripts/dom-builder.js';

/**
 * Decorates the category card block.
 * @param {Element} block The category card block element.
 */
export default function decorate(block) {
  const blockName = 'category-card';
  block.classList.add(`${blockName}-wrapper`);

  // Extract content from the block's children (assuming a table structure from authoring)
  // Expected structure:
  // div (row for image)
  //   div (cell for image URL)
  //   div (cell for image alt text)
  // div (row for title)
  //   div (cell for title text)
  // div (row for description)
  //   div (cell for description text)
  // div (row for link)
  //   div (cell for link text)
  //   div (cell for link URL)

  const [children] = block.children;
  console.log(block,children);
  // Default values for robustness
  let imageUrl = '';
  let imageAlt = '';
  let titleText = '';
  let descriptionText = '';
  let linkText = '';
  let linkHref = '#';

  try {
    // Image row
    const imageRow = children[0];
    if (imageRow && imageRow.children.length >= 2) {
      imageUrl = imageRow.children[0]?.textContent?.trim() || '';
      imageAlt = imageRow.children[1]?.textContent?.trim() || 'Category image';
    }

    // Title row
    const titleRow = children[1];
    if (titleRow && titleRow.children.length >= 1) {
      titleText = titleRow.children[0]?.textContent?.trim() || 'Category Title';
    }

    // Description row
    const descriptionRow = children[2];
    if (descriptionRow && descriptionRow.children.length >= 1) {
      descriptionText = descriptionRow.children[0]?.textContent?.trim() || 'A brief description of the category.';
    }

    // Link row
    const linkRow = children[3];
    if (linkRow && linkRow.children.length >= 2) {
      linkText = linkRow.children[0]?.textContent?.trim() || 'Browse Products →';
      linkHref = linkRow.children[1]?.textContent?.trim() || '#';
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error parsing category card content:', e);
    // Fallback to default values
  }

  // Clear the existing block content
  block.innerHTML = '';

  // Build the new semantic structure
  const categoryCard = div(
    {
      class: `${blockName} w-full h-full bg-white outline outline-1 outline-gray-300 flex flex-col items-start justify-start`,
    },
    img({
      class: `${blockName}-image w-full h-[164px] object-cover`,
      src: imageUrl,
      alt: imageAlt,
      loading: 'lazy',
    }),
    div(
      {
        class: `${blockName}-content-wrapper w-full h-[204px] flex flex-col justify-between items-start`,
      },
      div(
        {
          class: `${blockName}-text-container w-full p-3 bg-white flex flex-col items-start justify-start gap-3`,
        },
        div(
          {
            class: `${blockName}-title-wrapper w-full flex flex-col items-start justify-start gap-1`,
          },
          h2(
            {
              class: `${blockName}-title w-full text-black text-xl font-normal leading-7 font-twk-lausanne-pan`,
            },
            titleText,
          ),
        ),
        div(
          {
            class: `${blockName}-description-wrapper w-full flex flex-col items-start justify-start gap-1`,
          },
          p(
            {
              class: `${blockName}-description w-full text-gray-700 text-base font-extralight leading-5 font-twk-lausanne-pan`,
            },
            descriptionText,
          ),
        ),
      ),
      div(
        {
          class: `${blockName}-link-container w-full p-3 bg-white flex items-center justify-start`,
        },
        a(
          {
            class: `${blockName}-link text-danaherpurple-600 text-base font-bold leading-5 font-twk-lausanne-pan`,
            href: linkHref,
            'aria-label': `Browse products for ${titleText}`,
          },
          linkText,
        ),
      ),
    ),
  );

  block.append(categoryCard);
}

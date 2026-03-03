import {
  div,
  h3,
  p,
  a,
  span,
  img
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const categoryCardImage = block.children[0];
  const categoryCardContent = block.children[1];
  console.log("print data.....");
  console.log(categoryCardImage)
  console.log("print data end........");

  const imageSrc = categoryCardImage.querySelector('img')?.getAttribute('src') || '';
  const imageAlt = categoryCardImage.querySelector('img')?.getAttribute('alt') || 'Category Image';

  const categoryTitleEl = categoryCardContent.children[0]?.textContent.trim() || '';
  const categoryDescriptionEl = categoryCardContent.children[1]?.textContent.trim() || '';
  const ctaTextEl = categoryCardContent.children[2]?.textContent.trim() || '';
  const ctaLinkEl = categoryCardContent.children[3]?.querySelector('a')?.getAttribute('href') || '';
  const ctaLinkTargetEl = categoryCardContent.children[3]?.querySelector('a')?.getAttribute('target') || '';

  const cardImage = img({
    src: imageSrc,
    alt: imageAlt,
    class: 'w-full h-[164px] object-cover',
  });

  const categoryTitle = h3({
    class: 'text-lg font-bold leading-tight',
  }, categoryTitleEl);

  const categoryDescription = p({
    class: 'text-sm text-gray-600',
  }, categoryDescriptionEl);

  const ctaLink = a({
    href: ctaLinkEl,
    target: ctaLinkTargetEl,
    class: 'text-primary-500 font-bold text-base flex items-center gap-1 hover:underline',
  }, ctaTextEl, span({
    class: 'icon icon-arrow-right'
  }));

  const cardContent = div({
    class: 'p-4 flex flex-col justify-between flex-grow',
  },
    div({ class: 'mb-4' }, categoryTitle, categoryDescription),
    ctaLink
  );

  const categoryCardWrapper = div({
    class: 'category-card-wrapper bg-white outline outline-1 outline-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col',
  },
    cardImage,
    cardContent
  );

  decorateIcons(categoryCardWrapper);
  block.innerHTML = '';
  block.appendChild(categoryCardWrapper);
}
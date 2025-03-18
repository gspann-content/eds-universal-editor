import {
  div,
  span,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  // Main wrapper container
  const wrapper = div({ class: 'global-pb-32 md:global-pb-48' });

  // Background section container with styling for alignment
  const backgroundSection = document.createElement('section');
  backgroundSection.className = 'global-relative global-bg-cover global-bg-center global-bg-no-repeat';
  wrapper.appendChild(backgroundSection);

  // Primary content container with min-height
  const contentContainer = div({ class: 'global-relative global-min-h-[420px] md:global-min-h-[512px]' });
  backgroundSection.appendChild(contentContainer);

  const blockContainer = block.querySelector('div');
  const innerContainer = blockContainer.querySelector('div');

  // Handle the background image setup
  const backgroundImage = innerContainer.querySelector('picture');
  if (backgroundImage) {
    backgroundImage.className = 'global-absolute global-object-cover global-h-full global-w-full global-z-0';
    contentContainer.appendChild(backgroundImage);
  }

  // Add overlay to enhance text readability
  const overlay = div({
    class: 'global-absolute global-bg-black global-opacity-40 global-top-0 global-left-0 global-right-0 global-bottom-0 global-z-0',
  });
  contentContainer.appendChild(overlay);

  // Container for content layout
  const contentWrapper = div({
    class: 'global-relative global-container global-py-40 md:global-pb-64 global-flex global-items-end global-w-full global-min-h-[420px] md:global-min-h-[512px] global-z-10 md:global-pt-80',
  });
  contentContainer.appendChild(contentWrapper);

  // Inner container for flex layout
  const flexContainer = div({
    class: 'global-flex global-flex-col md:global-flex-row global-justify-between global-w-full global-items-end global-text-white',
  });
  contentWrapper.appendChild(flexContainer);

  const textContainer = div({ class: 'global-w-full' });
  flexContainer.appendChild(textContainer);

  // Add heading and paragraph
  const heading = block.querySelector('h1');
  const headingElement = document.createElement('h1');
  headingElement.className = 'text-bravo lg:global-max-w-9/12 xl:global-max-w-8/12 global-mt-16 md:global-mt-20';
  headingElement.textContent = heading.textContent;
  textContainer.appendChild(headingElement);

  const paragraph = block.querySelector('p');
  const paragraphContainer = div({
    class: 'atomic-richtext-content text-base global-mt-16 md:global-mt-20 lg:global-max-w-6/12 xl:global-max-w-5/12',
  });
  paragraphContainer.textContent = paragraph.textContent;
  textContainer.appendChild(paragraphContainer);

  // CTA section setup
  const ctaWrapper = div({ class: 'md:global-flex md:global-items-center md:global-space-x-16' });
  textContainer.appendChild(ctaWrapper);

  const ctaContainer = div({ class: 'global-mt-16 md:global-mt-20' });
  ctaWrapper.appendChild(ctaContainer);

  const linkElement = document.querySelector('a');
  const { href } = linkElement;
  const linkText = linkElement.textContent;

  const ctaLink = document.createElement('a');
  ctaLink.className = 'global-text-mobBase md:global-text-base global-inline-block focus-visible:global-outline-none global-whitespace-nowrap focus-visible:global-ring-offset-2 focus-visible:global-ring-2 focus-visible:global-ring-blue-700 global-rounded global-border global-py-12 global-px-16 md:global-px-20 active:global-bg-blue-900 global-border-blue-700 global-text-white global-bg-gradient-to-r global-bg-blue-700 global-from-blue-800 global-via-blue-800 global-to-blue-800 global-bg-bottom global-bg-no-repeat global-bg-[length:100%_0px] hover:global-bg-[length:100%_100%] global-transition-all motion-reduce:global-transition-none global-w-full md:global-w-auto';
  ctaLink.href = href;

  const ctaLinkInnerContainer = div({ class: 'global-flex global-items-center global-justify-between' });
  ctaLink.appendChild(ctaLinkInnerContainer);

  const ctaText = span({ class: 'global-whitespace-normal global-text-left' });
  ctaText.textContent = linkText;
  ctaLinkInnerContainer.appendChild(ctaText);

  ctaContainer.appendChild(ctaLink);

  // Add SVG icon for CTA
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIcon.setAttribute('width', '16');
  svgIcon.setAttribute('height', '14');
  svgIcon.setAttribute('viewBox', '0 0 16 14');
  svgIcon.setAttribute('fill', 'none');
  svgIcon.setAttribute('class', 'global-block global-ml-16 global-flex-shrink-0');
  svgIcon.setAttribute('data-di-rand', '1728544798255');

  const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  linePath.setAttribute('d', 'M0 7L15 7');
  linePath.setAttribute('stroke', 'currentColor');

  const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrowPath.setAttribute('d', 'M9 1L15 7L9 13');
  arrowPath.setAttribute('stroke', 'currentColor');

  svgIcon.appendChild(linePath);
  svgIcon.appendChild(arrowPath);
  ctaLinkInnerContainer.appendChild(svgIcon);
  block.textContent = '';
  block.classList.add('global');
  block.append(wrapper);
}

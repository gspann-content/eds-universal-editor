import {
  div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const sectionDiv = document.createElement('section');
  sectionDiv.className = 'global-pt-32 md:global-pt-48 global-pb-32 md:global-pb-48';
  const parentDiv = div({ class: 'global-container' });
  sectionDiv.appendChild(parentDiv);
  const childDiv = div({ class: 'global-flex global-flex-col md:global-flex-row md:global-flex-wrap' });
  parentDiv.appendChild(childDiv);

  const imageDiv = div({ class: 'global-w-full md:global-w-1/2 global-flex global-flex-col media-grid-item  md:global-pt-0 false' });
  parentDiv.appendChild(imageDiv);
  const anchorTag = document.createElement('a');
  const imageDiv1 = div({ class: 'global-w-full global-relative global-overflow-hidden global-aspect-[8/5]' });
  imageDiv.appendChild(anchorTag);
  anchorTag.appendChild(imageDiv1);

  const container = block.querySelector('div');
  const contentContainer = container.querySelector('div');
  const image = contentContainer.querySelector('picture > img');
  const imageTag = document.createElement('img');
  imageTag.className = 'global-transition-all global-duration-500 global-inset-0 global-top-0 global-left-0 global-w-full global-h-full global-object-cover hover:global-scale-[1.05] motion-reduce:hover:global-transform-none';
  imageTag.src = image.src;
  imageDiv1.appendChild(imageTag);

  block.textContent = '';
  block.append(sectionDiv);
}
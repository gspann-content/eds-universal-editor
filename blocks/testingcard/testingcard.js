
export default function decorate(block) {
 
    console.log("block", block);
    console.log("block.children", block.children);

    
  const blockContainer = block.querySelector('div');
  const innerContainer = blockContainer.querySelector('div');

  console.log("blockContainer", blockContainer);
    console.log("innerContainer", innerContainer);

      // Add heading and paragraph
      const heading = block.querySelector('h1');
      const headingElement = document.createElement('h1');
      headingElement.textContent = heading.textContent;
      headingElement.className = 'text-bravo lg:global-max-w-9/12 xl:global-max-w-8/12 global-mt-16 md:global-mt-20';
  
      textContainer.appendChild(headingElement);
        console.log("heading", heading);
        console.log("headingElement", headingElement);
      const paragraph = block.querySelector('p');
      const paragraphContainer = div({
          class: 'atomic-richtext-content text-base global-mt-16 md:global-mt-20 lg:global-max-w-6/12 xl:global-max-w-5/12',
        });
      paragraphContainer.textContent = paragraph.textContent;
      textContainer.appendChild(paragraphContainer);

      console.log("paragraph", paragraph);
      console.log("paragraphContainer", paragraphContainer);    

    
}
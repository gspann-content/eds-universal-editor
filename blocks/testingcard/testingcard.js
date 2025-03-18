
export default function decorate(block) {
 
    console.log("block", block);
    console.log("block.children", block.children);

    //    const wrapper = div({ class: 'global-pb-32 md:global-pb-48' });
    
      // Background section container with styling for alignment
       const backgroundSection = document.createElement('section');
    //    backgroundSection.className = 'global-relative global-bg-cover global-bg-center global-bg-no-repeat';
    //    wrapper.appendChild(backgroundSection);
    
      // Primary content container with min-height
      const contentContainer = div({ class: 'global-relative global-min-h-[420px] md:global-min-h-[512px]' });
      backgroundSection.appendChild(contentContainer);
    
  const blockContainer = block.querySelector('div');
  const innerContainer = blockContainer.querySelector('div');

  console.log("blockContainer", blockContainer);
    console.log("innerContainer", innerContainer);

     const backgroundImage = innerContainer.querySelector('picture');
        if (backgroundImage) {
            backgroundImage.className = 'global-absolute global-object-cover global-h-full global-w-full global-z-0';
            contentContainer.appendChild(backgroundImage);
        }
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
export default function decorate(block) {
    const tw = document.createElement('div');
    tw.className = 'tw break-after-auto';
  
    const bgHolder = div({ class: 'relative bg-cover bg-center bg-no-repeat' });
    // const bgHolder = document.createElement('div');
    // bgHolder.className = 'relative bg-cover bg-center bg-no-repeat';
  
    const container = block.querySelector('div');
    container.className = 'relative flex py-40 px-64 mx-32 min-h-[420px] md:min-h-[512px] md:pb-64 md:pt-80';
  
    const contentContainer = container.querySelector('div');
    contentContainer.className = 'flex flex-col w-full text-white';
  
    // Set the image as the background for tw container
    const image = contentContainer.querySelector('p > picture > img');
    bgHolder.style.backgroundImage = `url(${image.src})`;
  
    // Remove 1st P element
    const firstPElement = contentContainer.querySelector('p');
    firstPElement.remove();
  
    // Create div's for cotent and ctaContainer
    const content = document.createElement('div');
    content.className = 'content w-full';
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'cta-container text-base md:flex md:items-center md:space-x-16';
  
    // console.log("Size: ",[...contentContainer.children]);
  
    [...contentContainer.children].forEach((p, index) => {
      if (index <= 1) content.append(p);
      else ctaContainer.append(p);
    });
  
    const title = content.querySelector('p:first-child');
    const h1 = document.createElement('h1');
    // Set the text content of the new <h1> to be the same as the <p>
    h1.textContent = title.textContent;
    title.replaceWith(h1, title);
    title.remove();
    h1.className = 'text-bravo font-normal md:font-thin xl:max-w-8/12 mt-16 md:mt-20 lg:max-w-8/12';
  
    const description = content.querySelector('p:nth-child(2)');
    description.className = 'atomic-richtext-content text-base font-normal tracking-base mt-16 md:mt-20 xl:max-w-5/12 xl:max-w-5/12 lg:max-w-5/12';
  
    contentContainer.append(content);
    contentContainer.append(ctaContainer);
  
    const pElement = document.querySelector('.button-container');
    const button = document.createElement('div');
    button.className = 'cta-button mt-16 md:mt-20';
    if (pElement) {
      button.innerHTML = pElement.innerHTML;
      const anchorTag = button.querySelector('a');
      anchorTag.classList.remove('button');
      anchorTag.className = 'cta flex items-center gap-3 text-mobBase md:text-base inline-block focus-visible:outline-none whitespace-nowrap focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-700 rounded border py-12 px-16 md:px-20 active:bg-blue-900 border-blue-700 text-white bg-gradient-to-r bg-blue-700 from-blue-800 via-blue-800 to-blue-800 bg-bottom bg-no-repeat bg-[length:100%_0px] hover:bg-[length:100%_100%] transition-all motion-reduce:transition-none w-full md:w-auto';
  
      const arrowIcon = span({ class: 'icon icon-arrow size-5 block invert' });
  
      anchorTag.appendChild(arrowIcon);
  
      pElement.remove();
    }
  
    ctaContainer.append(button);
    container.append(contentContainer);
    bgHolder.append(container);
    tw.append(bgHolder);
  
    block.textContent = '';
    block.append(tw);
  
    decorateIcons(block);
  }
  
export default function decorate(block) {
  const test = document.createElement('div');
  test.classList.add('test');

  // Create the image element

  const blockContainer = block.querySelector('div');
  const innerContainer = blockContainer.querySelector('div');

  // Handle the background image setup
  const testImage = innerContainer.querySelector('picture');
  testImage.className.add('test-image');
  // Create the content container
  const testContent = document.createElement('div');
  testContent.classList.add('test-content');

  // Create the title
  const title = document.createElement('h3');
  title.textContent = 'test Title';

  // Create the paragraph
  const description = document.createElement('p');
  description.textContent = 'This is a simple test with text and an image.';

  // Append the elements to the content container
  testContent.appendChild(title);
  testContent.appendChild(description);

  // Append the image and content to the test
  test.appendChild(testImage);
  test.appendChild(testContent);

  block.textContent = '';
  block.append(test);
}

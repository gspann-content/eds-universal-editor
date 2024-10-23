import { createElement } from '../../scripts/scripts.js';

const getPageTitle = async (url) => {
  const resp = await fetch(url);
  if (resp.ok) {
    const html = document.createElement('div');
    html.innerHTML = await resp.text();
    return html.querySelector('title').innerText;
  }
  return '';
};

const getAllPathsExceptCurrent = async (paths) => {
  const result = [];
  const basePath = '/content/eds-ue-site/blocks'; // Base path to ignore
  const pathsList = paths.replace(/^\/|\/$/g, '').split('/');

  let prevPath = '';

  for (let i = 0; i < pathsList.length; i += 1) {
    const pathPart = pathsList[i];

    // Skip the base path segments
    if (prevPath === basePath) {
      prevPath = ''; // Reset prevPath if we've reached the base path
      continue;
    }

    // Build the current path based on the previous path
    prevPath = `${prevPath}/${pathPart}`;
    const path = `${prevPath}.html`; // Add .html suffix
    const url = `${window.location.origin}${path}`;

    const name = await getPageTitle(url);
    if (name) {
      // Use only the last part for the UI
      const displayName = i === pathsList.length - 1 ? name : pathPart;
      result.push({ path, name: displayName, url });
    }
  }

  return result;
};

const createLink = (path) => {
  const pathLink = document.createElement('a');
  pathLink.href = path.url;
  pathLink.innerText = path.name; // This will display the name in the UI
  pathLink.classList.add('breadcrumb-link'); // Add a class for styling
  return pathLink;
};

export default async function decorate(block) {
  const breadcrumb = createElement('nav', '', {
    'aria-label': 'Breadcrumb',
  });
  block.innerHTML = '';

  const HomeLink = createLink({ path: '', name: 'Home', url: window.location.origin });
  const breadcrumbLinks = [HomeLink.outerHTML];

  window.setTimeout(async () => {
    const path = window.location.pathname;
    const paths = await getAllPathsExceptCurrent(path);

    paths.forEach((pathPart) => breadcrumbLinks.push(createLink(pathPart).outerHTML));

    // Create currentPath element with bold text and black color
    const currentPath = document.createElement('span');
    currentPath.innerText = document.querySelector('title').innerText;
    currentPath.style.fontWeight = 'bold';  // Make text bold
    currentPath.style.color = 'black';       // Change text color to black
    breadcrumbLinks.push(currentPath.outerHTML);

    // Create the separator with the class and set color
    const separator = `<span class="breadcrumb-separator">></span>`;

    breadcrumb.innerHTML = breadcrumbLinks.join(separator);
    block.append(breadcrumb);
  }, 1000);
}

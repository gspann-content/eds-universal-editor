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
  // Remove first and last slash characters
  const pathsList = paths.replace(/^\/|\/$/g, '').split('/');
  for (let i = 0; i < pathsList.length - 1; i += 1) {
    const pathPart = pathsList[i];
    console.log("pathPart",pathPart);
    const prevPath = result[i - 1] ? result[i - 1].path : '';
    console.log("prevPath",prevPath);
    const path = `${prevPath}/${pathPart}`;
    console.log("path",path);
    const url = `${window.location.origin}${path}`;
     console.log("url",url);
    /* eslint-disable-next-line no-await-in-loop */
    const name = await getPageTitle(url);
    console.log("name",name);
    if (name) {
      result.push({ path, name, url });
    }
  }
  return result;
};

const createLink = (path) => {
  const pathLink = document.createElement('a');
  pathLink.href = path.url;
  pathLink.innerText = path.name;
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

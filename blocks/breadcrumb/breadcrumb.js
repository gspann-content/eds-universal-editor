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
    const prevPath = result[i - 1] ? result[i - 1].path : '';
    const path = `${prevPath}/${pathPart}`;
    const url = `${window.location.origin}${path}`;
    const name = await getPageTitle(url);
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
  return pathLink;
};

// Function to create an SVG for the Home icon
const createHomeIcon = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "currentColor");
  svg.innerHTML = `
    <path d="M12 3l10 9h-3v8h-6v-6h-4v6H5v-8H2l10-9z"/>
  `;
  return svg;
};

export default async function decorate(block) {
  const breadcrumb = createElement('nav', '', {
    'aria-label': 'Breadcrumb',
  });
  block.innerHTML = '';

  // Create the Home link with an SVG icon
  const homeIcon = createHomeIcon();
  const HomeLink = createLink({ path: '', name: '' });
  HomeLink.prepend(homeIcon); // Add the SVG before the link text (if any)
  HomeLink.append('Home'); // Optionally add text if you want it alongside the icon
  const breadcrumbLinks = [HomeLink.outerHTML];

  window.setTimeout(async () => {
    const path = window.location.pathname;
    const paths = await getAllPathsExceptCurrent(path);

    paths.forEach((pathPart) => breadcrumbLinks.push(createLink(pathPart).outerHTML));
    const currentPath = document.createElement('span');
    currentPath.innerText = document.querySelector('title').innerText;
    breadcrumbLinks.push(currentPath.outerHTML);

    breadcrumb.innerHTML = breadcrumbLinks.join('<span class="breadcrumb-separator">/</span>');
    block.append(breadcrumb);
  }, 1000);
}

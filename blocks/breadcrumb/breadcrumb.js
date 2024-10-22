import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ol, li, a, span,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const standardPath = '/content/eds-ue-site/blocks';
  const pathname = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const breadcrumbOl = ol({ class: 'breadcrumb-list' });

  // Start from the part after the standard path
  const relevantPathname = pathname.slice(pathname.indexOf('blocks') + 1);

  // Home Link
  const homeSvg = span({ class: 'home-logo' });
  const homeAnchor = a({ class: 'home-link', href: '/' }, homeSvg);
  decorateIcons(homeAnchor);
  const homeLi = li({ class: 'breadcrumb-item' }, homeAnchor);
  breadcrumbOl.appendChild(homeLi);

  let url = '';
  const length = relevantPathname.length;

  for (let i = 0; i < length; i += 1) {
    url = `${url}/${relevantPathname[i]}`;
    const pathnameToUpperCase = relevantPathname[i].charAt(0).toUpperCase();
    const linkText = (i === length - 1) ? title : pathnameToUpperCase + relevantPathname[i].slice(1);
    const formattedLinkText = linkText.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

    const breadcrumbLink = a({
      class: `breadcrumb-link ${i === length - 1 ? 'last' : ''}`,
      href: url,
    }, formattedLinkText);

    const breadcrumbLi = li({ class: 'breadcrumb-item' }, breadcrumbLink);
    breadcrumbOl.appendChild(breadcrumbLi);

    // Add arrow separator if not the last item
    if (i < length - 1) {
      const separatorLi = li({ class: 'separator-item' }, span({ class: 'separator-arrow', textContent: '→' }));
      breadcrumbOl.appendChild(separatorLi);
    }
  }

  const breadcrumbNav = nav(
    { class: 'breadcrumb-nav' },
    div({ class: 'breadcrumb-container' }, breadcrumbOl),
  );

  block.classList.add('custom-breadcrumb');
  block.appendChild(breadcrumbNav);
}

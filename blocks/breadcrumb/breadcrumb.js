import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ol, li, a, span,
} from '../../scripts/dom-builder.js';

// Breadcrumb functionality implementation
export default function decorate(block) {
  const pathname = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');

  // Find the index of "eds-ue-site"
  const startIndex = pathname.indexOf('eds-ue-site');

  // Slice the relevant path including "eds-ue-site"
  const relevantPathname = pathname.slice(startIndex); // Start from "eds-ue-site"

  const breadcrumbOl = ol({ class: 'breadcrumb-list' });

  // Home Link
  const homeSvg = span({ class: 'home-logo' });
  const homeAnchor = a({
    class: 'home-link',
    href: '/',
  });
  homeAnchor.appendChild(homeSvg);
  decorateIcons(homeAnchor);

  const homeLi = li({ class: 'breadcrumb-item' }, homeAnchor);
  breadcrumbOl.appendChild(homeLi);

  let url = `/${pathname.slice(1, startIndex + 1).join('/')}`; // Base URL up to "eds-ue-site"

  for (let i = 0; i < relevantPathname.length; i += 1) {
    const currentPathSegment = relevantPathname[i];

    // Update the URL for the current segment
    url += `/${currentPathSegment}`; // Correctly append the current segment to the URL

    const pathnameToUpperCase = currentPathSegment.charAt(0).toUpperCase();
    const linkText = (i === relevantPathname.length - 1) ? title : pathnameToUpperCase + currentPathSegment.slice(1);
    const formattedLinkText = linkText.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

    const breadcrumbLink = a({
      class: `breadcrumb-link ${i === relevantPathname.length - 1 ? 'last' : ''}`,
      href: url, // Correctly constructed URL
    }, formattedLinkText);

    const breadcrumbLi = li({ class: 'breadcrumb-item' }, breadcrumbLink);
    breadcrumbOl.appendChild(breadcrumbLi);

    // Add arrow separator if not the last item
    if (i < relevantPathname.length - 1) {
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

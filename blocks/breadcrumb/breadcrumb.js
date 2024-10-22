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

  // Get relevant pathname segments after "eds-ue-site"
  const relevantPathname = pathname.slice(startIndex + 1);

  const breadcrumbOl = ol({ class: 'breadcrumb-list' });

  // Home Link
  const homeAnchor = a({
    class: 'home-link',
    href: 'https://sciex.com',
  }, 'Home');

  const homeLi = li({ class: 'breadcrumb-item' }, homeAnchor);
  breadcrumbOl.appendChild(homeLi);

  let url = `/content/eds-ue-site`; // Base URL

  relevantPathname.forEach((segment, index) => {
    url += `/${segment}`; // Construct the complete URL

    const linkText = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
    const breadcrumbLink = a({
      class: `breadcrumb-link ${index === relevantPathname.length - 1 ? 'last' : ''}`,
      href: url,
    }, linkText);

    const breadcrumbLi = li({ class: 'breadcrumb-item' }, breadcrumbLink);
    breadcrumbOl.appendChild(breadcrumbLi);

    // Add arrow separator if not the last item
    if (index < relevantPathname.length - 1) {
      const separatorLi = li({ class: 'separator-item' }, span({ class: 'separator-arrow', textContent: '→' }));
      breadcrumbOl.appendChild(separatorLi);
    }
  });

  const breadcrumbNav = nav(
    { class: 'breadcrumb-nav' },
    div({ class: 'breadcrumb-container' }, breadcrumbOl),
  );

  block.classList.add('custom-breadcrumb');
  block.appendChild(breadcrumbNav);
}

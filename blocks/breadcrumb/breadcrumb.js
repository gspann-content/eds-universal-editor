import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ol, li, a, span,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const pathname = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const { length } = pathname;
  const breadcrumbOl = ol({ class: 'breadcrumb-list' });
  const homeSvg = span({ class: 'home-logo' });
  const homeAnchor = a({
    class: 'home-link',
    href: '/',
  });
  homeAnchor.appendChild(homeSvg);
  decorateIcons(homeAnchor);

  const homeLi = li({ class: 'breadcrumb-item' }, homeAnchor);
  breadcrumbOl.appendChild(homeLi);

  let url = '';
  for (let i = 0; i < length; i += 1) {
    url = `${url}/${pathname[i]}`;
    const pathnameToUpperCase = pathname[i].charAt(0).toUpperCase();
    const linkText = (i === length - 1) ? title : pathnameToUpperCase + pathname[i].slice(1);
    const formattedLinkText = linkText.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

    const breadcrumbLink = a({
      class: `breadcrumb-link ${i === length - 1 ? 'last' : ''}`,
      href: url,
    }, formattedLinkText);
    
    const breadcrumbLi = li({ class: 'breadcrumb-item' }, breadcrumbLink);
    breadcrumbOl.appendChild(breadcrumbLi);

    if (i < length - 1) {
      const separatorSvg = span({ class: 'icon icon-chevron' });
      const separatorLi = li({ class: 'separator-item' }, separatorSvg);
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

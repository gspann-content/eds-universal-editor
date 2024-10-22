import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ol, li, a, span,
} from '../../scripts/dom-builder.js';

// breadcrumb functionality implementation
export default function decorate(block) {
  const pathname = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const { length } = pathname;
  const breadcrumbOl = ol({ class: 'flex mobile-scroll tw-overflow-y-hidden tw-overflow-x-auto tw-flex-1 tw-flex tw-items-center text-sm' });
  const homeSvg = span({ class: 'home-logo tw-h-full tw-w-full tw-flex icon icon-home ' });
  const homeAnchor = a({
    class: 'tw-text-grey-500 hover:tw-text-grey-900 tw-transition-colors tw-duration-300',
    href: '/',
  });
  homeAnchor.appendChild( );
  decorateIcons(homeAnchor);

  const homeLi = li({ class: 'tw-flex tw-items-center tw-mt-4' }, homeAnchor);
  breadcrumbOl.appendChild(homeLi);

  let url = '';
  for (let i = 0; i < length; i += 1) {
    url = `${url}/${pathname[i]}`;
    const pathnameToUpperCase = pathname[i].charAt(0).toUpperCase();
    const linkText = (i === length - 1) ? title : pathnameToUpperCase + pathname[i].slice(1);
    const formattedLinkText = linkText.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
    if (i < length) {
      // Create separator SVG
      const divSvg = div({ class: 'tw-text-grey-500 tw-pr-8' });
      const separatorSvg = span({ class: 'icon icon-chevron tw-h-full tw-w-full tw-flex' });
      divSvg.appendChild(separatorSvg);
      decorateIcons(divSvg);

      // Create breadcrumb link
      const breadcrumbLink = a({
        class: ' tw-text-grey-500 hover:tw-text-grey-900 tw-transition-colors tw-whitespace-nowrap tw-tracking-wide tw-duration-300',
        href: url,
      }, formattedLinkText);
      breadcrumbLink.appendChild(divSvg);
      // Create list item with separator
      const breadcrumbLi = li(
        { class: 'tw-flex tw-items-center tw-ml-4' },
        divSvg,
        breadcrumbLink,
      );
      breadcrumbOl.appendChild(breadcrumbLi);
    } else {
      // Create last breadcrumb link
      const breadcrumbLink = a({
        class: 'tw-text-grey-500 hover:tw-text-grey-900 tw-transition-colors tw-whitespace-nowrap tw-tracking-wide tw-duration-300 tw-ml-8',
        href: url,
      }, formattedLinkText);
      const breadcrumbLi = li({ class: 'tw-flex tw-items-center' }, breadcrumbLink);
      breadcrumbOl.appendChild(breadcrumbLi);
    }
  }

  const breadcrumbNav = nav(
    { class: 'tw-pt-16 tw-w-screen tw-pb-32 md:tw-pb-48' },
    div({ class: 'tw-container tw-px-0 tw-ml-0' }, breadcrumbOl),
  );

  block.classList.add('tw');
  block.appendChild(breadcrumbNav);
}

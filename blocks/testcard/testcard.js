export default function decorate(block) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = '/w3images/team2.jpg';
  img.alt = 'John';
  img.style.width = '100%';

  const name = document.createElement('h1');
  name.textContent = 'John Doe';

  const title = document.createElement('p');
  title.classList.add('title');
  title.textContent = 'CEO & Founder, Example';

  const university = document.createElement('p');
  university.textContent = 'Harvard University';

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.style.margin = '24px 0';

  const dribbbleLink = document.createElement('a');
  dribbbleLink.href = '#';
  const dribbbleIcon = document.createElement('i');
  dribbbleIcon.classList.add('fa', 'fa-dribbble');
  dribbbleLink.appendChild(dribbbleIcon);

  const twitterLink = document.createElement('a');
  twitterLink.href = '#';
  const twitterIcon = document.createElement('i');
  twitterIcon.classList.add('fa', 'fa-twitter');
  twitterLink.appendChild(twitterIcon);

  const linkedinLink = document.createElement('a');
  linkedinLink.href = '#';
  const linkedinIcon = document.createElement('i');
  linkedinIcon.classList.add('fa', 'fa-linkedin');
  linkedinLink.appendChild(linkedinIcon);

  const facebookLink = document.createElement('a');
  facebookLink.href = '#';
  const facebookIcon = document.createElement('i');
  facebookIcon.classList.add('fa', 'fa-facebook');
  facebookLink.appendChild(facebookIcon);

  socialMediaDiv.appendChild(dribbbleLink);
  socialMediaDiv.appendChild(twitterLink);
  socialMediaDiv.appendChild(linkedinLink);
  socialMediaDiv.appendChild(facebookLink);

  const contactButton = document.createElement('button');
  contactButton.textContent = 'Contact';

  // Append all elements to the card
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(title);
  card.appendChild(university);
  card.appendChild(socialMediaDiv);
  card.appendChild(contactButton);

  block.textContent = '';
  block.append(card);
}

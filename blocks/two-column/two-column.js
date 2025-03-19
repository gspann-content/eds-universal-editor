// import {
//     div,
//     span,
//   } from '../../scripts/dom-builder.js';

// export default function decorate(block) {
//     // Wait for the DOM to load before applying styles
//     // Get the parent div element
//     const parentDiv = document.querySelector('div');

//     // Set up the styles for the parent div using flexbox
//     parentDiv.style.display = 'flex';
//     parentDiv.style.flexWrap = 'wrap';  // Ensures content wraps when needed
//     parentDiv.style.alignItems = 'center';  // Vertically align items in the center

//     // Get the child div that contains the image and set the image's size to fit the right side
//     const imageDiv = parentDiv.querySelector('div');
//     const picture = imageDiv.querySelector('picture');
//     const img = picture.querySelector('img');

//     // Set styles for the image: make it take up the right half of the screen
//     img.style.maxWidth = '50%';
//     img.style.height = 'auto';

//     // Set the left-side text behavior
//     const textDiv = document.createElement('div');
//     textDiv.textContent = 'Your text content goes here. Your text content goes here. Your text content goes here. Your text content goes here. Your text content goes here.';
//     parentDiv.appendChild(textDiv);

//     // Set the text container styles
//     textDiv.style.flex = '1'; // Allow text to take up available space on the left
//     textDiv.style.paddingRight = '20px'; // Add some spacing between the text and image

//     // Add responsiveness so text wraps after half the width of the screen
//     const style = document.createElement('style');
//     style.innerHTML = `
//         @media (max-width: 768px) {
//             ${parentDiv.classList} {
//                 flex-direction: column;
//                 align-items: center;
//             }
//         }
//     `;
//     document.head.appendChild(style);

// }

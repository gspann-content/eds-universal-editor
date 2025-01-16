import {} from '../../scripts/aem.js';
import { searchEngine } from '../../scripts/coveo-search/engine.js';
import { renderSearchBox } from '../../scripts/coveo-search/components/renderSearchBox.js';
import { renderSearchResults } from '../../scripts/coveo-search/components/searchResult.js';
import { renderSourceFacet, renderFiletypeFacet, renderPagetypeFacet} from '../../scripts/coveo-search/components/categoryFacets.js'
import { renderPagination } from '../../scripts/coveo-search/components/pagination.js'
import { renderQuerySummary } from '../../scripts/coveo-search/components/querySummary.js'
import { renderSorting } from '../../scripts/coveo-search/components/sorting.js'
export default async function decorate(block) {
  block.textContent = '';
  // Create the main container div
  const coveoSearchDiv = document.createElement('div');
  coveoSearchDiv.classList.add('coveo-search');

  // Create the form element
  const coveoSearchForm = document.createElement('form');
  coveoSearchForm.id = 'coveoSearchForm';
  coveoSearchForm.classList.add('coveo-search-form');

  // Create the input element
  const coveoSearchInput = document.createElement('input');
  coveoSearchInput.type = 'text';
  coveoSearchInput.id = 'coveoSearchInput';
  coveoSearchInput.placeholder = 'Search...';
  coveoSearchInput.classList.add('search-input');

  // Create the button element
  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.classList.add('search-button');
  searchButton.textContent = 'Search';

  // Create the search results div
  const coveoSearchResults = document.createElement('div');
  coveoSearchResults.id = 'coveoSearchResults';
  coveoSearchResults.classList.add('search-results');

  // Append elements in the correct hierarchy
  coveoSearchForm.appendChild(coveoSearchInput);
  coveoSearchForm.appendChild(searchButton);
  coveoSearchDiv.appendChild(coveoSearchForm);
  coveoSearchDiv.appendChild(coveoSearchResults);

  block.append(coveoSearchDiv);

  try {
    renderSearchBox();
    renderSorting();
    searchEngine.executeFirstSearch();
    searchEngine.subscribe(() => {
      renderSearchResults();
      renderQuerySummary();
      renderSourceFacet();
      renderFiletypeFacet();
      renderPagetypeFacet();
      renderPagination();
    });

    await searchEngine.executeFirstSearch().catch((error) => {
      console.error('Error executing the first search:', error);
    });

  } catch (error) {
    console.error('Error initializing search engine:', error);
  }
}

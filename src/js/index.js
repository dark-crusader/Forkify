// Global app controller

import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

/** Stores current state of the app
 * Search object
 * Current recipe
 * Shopping list
 * Favourite recipies
*/
const state = {};

const controlSearch = async () => {
    // TODO: Getting query from searchView
    const query = searchView.getInput();
    // If exists
    if (query) {
        // Modify state
        state.search = new Search(query);
        // TODO: Change UI
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);
        // Search for recipes
        await state.search.getResults();

        // TODO: Render results to UI
        clearLoader();
        searchView.renderResults(state.search.result);
        
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        // Clear and render required page
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

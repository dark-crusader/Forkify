// Global app controller

import Search from './models/Search';
import {elements} from './views/base';
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

        // Search for recipes
        await state.search.getResults();

        // TODO: Render results to UI
        searchView.renderResults(state.search.result);
        
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/** Stores current state of the app
 * Search object
 * Current recipe
 * Shopping list
 * Favourite recipies
*/
const state = {};

/**
 * Search Controller
 */
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
        try {
            // Search for recipes
            await state.search.getResults();
    
            // TODO: Render results to UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            clearLoader();
            alert('Sorry, no recipes found...');
        }
        
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

/**
 * Recipe Controller
 */

const controlRecipe = async () => {
    // Get ID of recipe
    const ID = window.location.hash.replace('#', '');

    if (ID) {
        // TODOS:
        // Change UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if (state.search)
            searchView.highlightSelected(ID);
        // Create recipe Object
        state.recipe = new Recipe(ID);
        try {
            // Instantiate recipe Object
            await state.recipe.getRecipe();
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Sorry, We couldn\'t fetch that recipe...');
        }
        
    } 
};

['hashchange', 'load'].forEach(event => {window.addEventListener(event, controlRecipe)});

// Event handlers for buttons to change serving size
elements.recipe.addEventListener('click', e => {
    if (event.target.matches('.btn-dec, .btn-dec *')) {
        // Decrease button clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    } else if (event.target.matches('.btn-inc, .btn-inc *')) {
        // Increase button clicked
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }
    
});
// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

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
            recipeView.renderRecipe(
                    state.recipe, 
                    state.likes.isLiked(ID)
                );
        } catch (err) {
            alert('Sorry, We couldn\'t fetch that recipe...');
        }
        
    } 
};

['hashchange', 'load'].forEach(event => {window.addEventListener(event, controlRecipe)});

/** 
 * List Controller
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list items
elements.list.addEventListener('click', e => {
    const ID = e.target.closest('.shopping__item').dataset.itemid;
    // Handle if delete button clicked
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from list
        state.list.deleteItem(ID);
        // Delete from UI
        listView.deleteItem(ID);        
    } else if (e.target.matches('.shopping__count-value')) {
        // Handles count update
        const val = parseFloat(e.target.value);
        state.list.updateCount(ID, val);
    }

});

/**
 * Likes Controller
 */
if (!state.likes) state.likes = new Likes();
likesView.toggleLikesMenu(state.likes.getNumLikes());
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const recID = state.recipe.id;
    // Check if not already liked
    if (!state.likes.isLiked(recID)) {
        // Add to liked list
        const newLike = state.likes.addLike(
                recID,
                state.recipe.title,
                state.recipe.author,
                state.recipe.img
            );
        // Toggle like button
        likesView.toggleLikeBtn();

        // Add recipe to UI likes list
        likesView.renderLike(newLike);
        
    } else {
        // Remove from liked list
        state.likes.deleteLike(recID);
        // Toggle like button
        likesView.toggleLikeBtn();
        // Remove recipe from UI likes list
        likesView.deleteLike(recID);
    }
    likesView.toggleLikesMenu(state.likes.getNumLikes());
};


// Event handlers for buttons
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
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // If like button clicked, add recipe to list of liked recipes
        controlLike();
    }
    
});
import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const limitTitle = (title, limit = 17) => {
    if (title.length > limit) {
        let newTitle = '';
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle += `${curr} `;
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = 
    `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Function to get markup for required button
const makeButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
        <span>Page ${type==='prev'?page-1:page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
    </button>
`;

    // <!--
    // <button class="btn-inline results__btn--prev">
    //     <svg class="search__icon">
    //         <use href="img/icons.svg#icon-triangle-left"></use>
    //     </svg>
    //     <span>Page 1</span>
    // </button>
    // <button class="btn-inline results__btn--next">
    //     <span>Page 3</span>
    //     <svg class="search__icon">
    //         <use href="img/icons.svg#icon-triangle-right"></use>
    //     </svg>
    // </button>
    // --> 

const renderButtons = (page, numRes, resPerPage) => {
    const pages = Math.ceil(numRes / resPerPage);
    // If only one page, no need to render buttons
    if (pages === 1) {
        return;
    }
    let button;
    if (page === 1) {
        // If on first page, only previous button is rendered
        button = makeButton(page, 'next');
    } else if (page === pages) {
        // If on last page, render only next button
        button = makeButton(page, 'prev');
    } else {
        // Else render both
        button = `
            ${makeButton(page, 'prev')}
            ${makeButton(page, 'next')}
        `;
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = start + resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};
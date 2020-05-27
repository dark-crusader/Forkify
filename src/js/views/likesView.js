import { elements } from './base';
import { limitTitle } from './searchView';
// Function to toggle likes button
export const toggleLikeBtn = () => {
    const [pre, currBtn] = document.querySelector('.recipe__love use').getAttribute('href').split('#');
    const nextBtn = currBtn === 'icon-heart' ? 'icon-heart-outlined' : 'icon-heart';
    document.querySelector('.recipe__love use').setAttribute('href', `${pre}#${nextBtn}`);
};

export const toggleLikesMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    const ele = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (ele) {
        ele.parentElement.removeChild(ele);
    }
}
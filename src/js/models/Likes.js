export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(ID) {
        const index = this.likes.findIndex(el => el.id === ID);
        this.likes.splice(index, 1);
    }

    // Method which returns if a recipe is liked
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
}
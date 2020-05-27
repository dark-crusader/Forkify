export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        this.persistData();
        return like;
    }

    deleteLike(ID) {
        const index = this.likes.findIndex(el => el.id === ID);
        this.likes.splice(index, 1);
        this.persistData();
    }

    // Method which returns if a recipe is liked
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    // Method to persist data to local storage
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // Method to read data from local storage
    readStorage() {
        const localLikes = JSON.parse(localStorage.getItem('likes'));
        // Restore to this.likes if likes exist in local storage
        if (localLikes) {
            this.likes = localLikes;
        }
    }
}
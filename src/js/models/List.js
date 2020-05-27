import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(ID) {
        const index = this.items.findIndex(el => el.id === ID);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        // Update only if geater than 1
        if (newCount > 0) {
            this.items.find(el => el.id === id).count = newCount;
        }
    }
}
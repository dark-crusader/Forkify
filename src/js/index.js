// Global app controller

import Search from './models/Search';

const search = new Search('pasta');
console.log(search);
search.getResults();

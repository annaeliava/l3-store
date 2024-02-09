import html from './favorites.tpl.html';
import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { ProductData } from 'types';
import { favoritesService } from '../../services/favorites.service';

class Favorites extends Component {
    favorites!: ProductData[];
    favoritesList: ProductList;

    constructor(props: any) {
        super(props);
        this.favoritesList = new ProductList();
        this.favoritesList.attach(this.view.favorites);
    }

    async render() {
        this.favorites = await favoritesService.get();
        this.favoritesList.update(this.favorites);
    }
}

export const favoritesComp = new Favorites(html);
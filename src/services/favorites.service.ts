import localforage from "localforage";
import { ProductData } from "types";

const DB = '__wb-favorites';

class FavoritesService {
    init() {
        this._updCounters();
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);
    }

    async addFavorite(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
    }

    async removeFavorite(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({ id }) => id !== product.id));
    }

    async isFavorite(product: ProductData) {
        const products = await this.get();
        return products.some(({ id }) => id === product.id);
    }

    private async _updCounters() {
        const products = await this.get();

        let count: any;

        document.querySelector('.js__fav')?.classList.toggle('hide', products.length <= 0);

        if (products.length >= 0) {
            count = products.length >= 10 ? '9+' : products.length;
        }

        //@ts-ignore
        document.querySelectorAll('.js__fav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    }
}

export const favoritesService = new FavoritesService();
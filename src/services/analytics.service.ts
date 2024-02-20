import { ProductData, AnalyticsEvent } from "types";

const analyticsApi = '/api/sendEvent';

class AnalyticsService {
    route(href: string) {
        const data = {
            type: 'route',
            payload: {
                url: href
            },
            timestamp: Date.now()
        }
        this.sendEvent(data);
    }

    viewCard(item: ProductData) {
        const data = {
            type: 'viewCard',
            payload: item,
            timestamp: Date.now()
        }
        this.sendEvent(data);
    }

    viewCardPromo(item: ProductData) {
        const data = {
            type: 'viewCardPromo',
            payload: item,
            timestamp: Date.now()
        }
        this.sendEvent(data);
    }

    addToCart(item: ProductData) {
        const data = {
            type: 'addToCart',
            payload: item,
            timestamp: Date.now()
        }
        this.sendEvent(data);
    }

    purchase(totalPrice: number, productsId: Array<number>) {
        return {
            type: 'purchase',
            payload: {
                orderId: Date.now(),
                totalPrice: totalPrice,
                productsId: productsId
            },
            timestamp: Date.now()
        }
    }

    private async sendEvent(data: AnalyticsEvent): Promise<void> {
        fetch(analyticsApi, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.warn('Something went wrong!', error);
            });
    }
}

export const analyticsService = new AnalyticsService();
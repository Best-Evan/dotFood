import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStoreManager {
    static async getProducts() {
        return await AsyncStorage.getItem('products');
    }

    static async clearProducts() {
        await AsyncStorage.setItem('products', JSON.stringify([]));
    }

    static async addProductAmount(product, amount) {
        try {
            let products = await this.getProducts();
            products = products ? JSON.parse(products) : [];
            let index = products.findIndex(item => { return item.id === product.id });
            if (index == -1)
                products.push({ ...product, amount: amount });
            else
                products[index].amount += amount;
            await AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            console.log(e);
        }
    }

    static async changeProductAmount(product, amount) {
        try {
            let products = await this.getProducts();
            products = products ? JSON.parse(products) : [];
            let index = products.findIndex(item => { return item.id === product.id });
            if (amount == 0) {
                if (index != -1)
                    products.splice(index, 1);
            }
            else {
                if (index == -1)
                    products.push({ ...product, amount: amount });
                else
                    products[index].amount = amount;
            }
            await AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            console.log(e);
        }
    }
    
    static async getShops() {
        let resp = await AsyncStoreManager.getProducts();
        resp = resp ? JSON.parse(resp) : [];
        let shops = {};
        for (let product of resp) {
            if (shops[product.shop_name])
                shops[product.shop_name].push(product);
            else
                shops[product.shop_name] = [product];
        }
        return shops;
    }
}
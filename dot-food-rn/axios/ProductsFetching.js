import axios from 'axios';
import axiosConstants from './axiosConstants';

export default class ProductsManager {
    static async getProducts(productName, authState, setProducts) {
        const token = JSON.parse(authState.userToken);
        const resp = await axios({
            method: 'get',
            url: `http://${axiosConstants.ip}/product/?product_name=${productName}`,
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            },
            timeout: axiosConstants.timeout,
        })
        setProducts(resp.data);
    }
}

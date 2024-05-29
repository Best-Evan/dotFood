import axios from 'axios';
import axiosConstants from './axiosConstants';

export default class GeoManager {

    static async getShop(data) {
        const resp = await axios({
            method: 'get',
            url: `http://${axiosConstants.ip}/shop/coords?shop_name=${data.shopName}&ll_first=${data.longitude}&ll_second=${data.latitude}`,
            headers: {
                "accept": "application/json",
            },
            timeout: axiosConstants.timeout,
        });
        return resp.data;
    }
    static async getShops(data) {
        const response = {};
        for (let shop of data.shops) {
            response[shop] = await GeoManager.getShop({ shopName: shop, longitude: data.longitude, latitude: data.latitude })
        }
        return response;
    }
}
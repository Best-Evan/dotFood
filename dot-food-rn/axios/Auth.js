import axios from 'axios';
import axiosConstants from './axiosConstants';
import qs from 'qs';

export default class AuthManager {

    static async login(data) {
        let responseData = null; // если не получится - вернется null
        try {
            const resp = await axios({
                method: 'post',
                url: `http://${axiosConstants.ip}/token`,
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                timeout: axiosConstants.timeout,
                data: qs.stringify({ "username": data.username, "password": data.password })
            });
            responseData = resp.data;

        } catch (err) {
            console.log(err);
        } finally {
            return responseData;
        }
    }

    static async register(data) {
        let responseStatus = null;
        try {
            const resp = await axios({
                method: 'post',
                url: `http://${axiosConstants.ip}/auth/register`,
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                timeout: axiosConstants.timeout,
                data: { "login": data.username, "password": data.password, "email": data.email }
            });
            responseStatus = resp.status;
        } catch (err) {
            console.log(err);
        } finally {
            return responseStatus;
        }
    }

    static async getMe(setData, authState) {
        const token = JSON.parse(authState.userToken);
        const resp = await axios({
            method: 'get',
            url: `http://${axiosConstants.ip}/users/me`,
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            },
            timeout: axiosConstants.timeout,
        })
        setData(resp.data)
    }

}
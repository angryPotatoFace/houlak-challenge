/* eslint-disable @typescript-eslint/no-empty-function */
import config from '../../config';
import request from 'request';
import Methods from '../controller/methods';

export default class api {
    client_id: string
    client_secret: string
    
    constructor(){
        this.client_id = config.CLIENT_ID;
        this.client_secret = config.CLIENT_SECRET;
    }

    async getToken(){
        const method = Methods.POST
        const url = 'https://accounts.spotify.com/api/token'
        const header = { 'Authorization': 'Basic ' + ( Buffer.from(this.client_id + ':' + this.client_secret).toString('base64')) }
        const form = { grant_type: 'client_credentials' }
        const formatRequest = this.getFormatRequest(method,url,header,form );
        
        try{
            const response = await this.doRequest(formatRequest);
            return (response);
        }catch(e) {
           return (e)
        }
    }

    doRequest(url) {
        return new Promise(function (resolve, reject) {
          request(url, function (error, res, body) {
            if (!error && res.statusCode === 200) {
              resolve(body);
            } else {
              reject(error);
            }
          });
        });
    }

    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    getFormatRequest( method: string,url: string, headers: object,form={} ){
        const query={ 
            method: method,
            url: url,
            headers: headers,
            form: form,
            json: true
        }
        return query;
    }
}
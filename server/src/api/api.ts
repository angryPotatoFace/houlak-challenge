/* eslint-disable @typescript-eslint/no-empty-function */
import config from '../../config';
import request from 'request';
import Methods from '../controller/methods';
import Factory from '../model/DAO/factory';

export default class api {
    client_id: string
    client_secret: string
    model
    
    constructor(){
        this.client_id = config.CLIENT_ID;
        this.client_secret = config.CLIENT_SECRET;
        this.model = Factory.get( config.DATA_BASE );
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

    getFormatRequest( method: string,url: string, headers: object, form={} ){
        const query={ 
            method: method,
            url: url,
            headers: headers,
            form: form,
            json: true
        }
        return query;
    }
  
    async saveRequest(ip: string, artist: string ){
      const log = {
        ip,
        date: new Date().toLocaleDateString(),
        artist
      }
      await this.model.uploadRequest(log);
    }

    async getHistorical(){
      return await this.model.getHistorical();
    }
}
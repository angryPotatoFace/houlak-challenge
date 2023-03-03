import querystring from 'querystring';
import config from '../../config';
import Api from '../api/api';
import Methods  from './methods';
import { Request , Response } from 'express';

export default class Controller{
    
    private api: Api
    private api_url: string
  
    constructor(){
        this.api = new Api();
        this.api_url = config.API_URL;
    }

    searchArtist = async (req: Request , res: Response ) =>{ 

        const { access_token } = await this.api.getToken();
        const apiUrl: string = this.api_url + '/search?';
        const params:string = querystring.stringify( req.body );
        const method:string = Methods.GET;
        const url: string = apiUrl + params;
        const header = { 
            'Authorization': ' Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
        
        const queryRequest = this.api.getFormatRequest( method, url, header )

        try {
            const data = await this.api.doRequest( queryRequest);
            const ip = String( req.ip || req.ips || req.connection.remoteAddress );
            await this.api.saveRequest(ip , req.body.q);
            res.json(data);
        }catch( e){
            res.json(e);
        }
    }

    getAlbums = async (req: Request , res: Response ) =>{  

        const { access_token } = await this.api.getToken();
        const { id , limit } = req.params;
        const url = this.api_url + `/artists/${id}/albums?market=AR&limit=${limit}`;
        const method = Methods.GET
        const header = { 
            'Authorization': ' Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
        const queryRequest = this.api.getFormatRequest( method,url,header )

        try {
            const data = await this.api.doRequest( queryRequest);
            res.json(data);
        }catch( e){
            res.json(e);
        }
    }

    getToken = async (req: Request , res: Response ) => { 
        try{
            const response = await this.api.getToken();
            res.json( response);
        }catch( e) {
            res.json( e )
        }
    }

    getIdAlbumsByPopularity = async (req: Request , res: Response ) => {
        const arr = req.body;
        const { access_token } = await this.api.getToken()
        const method = Methods.GET
        const header = { 
        'Authorization': ' Bearer ' + access_token,
        'Content-Type': 'application/json'
        }
    
        const querys = arr.map( (id: string) => this.api.getFormatRequest( method, ( this.api_url + `/albums/${id}`),header ))

        try{
            const dataComplete = querys.map( async( query: any ) => await this.api.doRequest(query) );
            const resp = await Promise.all(dataComplete);
            const orderedData = resp.sort( (a , b) => b.popularity - a.popularity );
            res.json(orderedData);
        }catch( e) {
            res.json(e);
        }
    }

    getHistorical = async (req: Request , res: Response ) => {
        try{
            const resp = await this.api.getHistorical();
            res.json(resp);
        }catch(e){
            res.json(e) ;
        }  
    }
}
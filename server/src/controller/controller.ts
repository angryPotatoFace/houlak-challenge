import querystring from 'querystring';
import config from '../../config';
import Api from '../api/api';
import Methods  from './methods';

export default class Controller{
    
    private client_id: string
    private client_secret: string
    private redirect_uri: string
    private stateKey: string
    private api: Api
    private api_url: string
  
    constructor(){
        this.client_id = config.CLIENT_ID;
        this.client_secret = config.CLIENT_SECRET;
        this.redirect_uri = config.REDIRECT_URI;
        this.stateKey = 'spotify_auth_state';
        this.api = new Api();
        this.api_url = config.API_URL;
    }


    login = ( req, res) => {
        const state = this.api.generateRandomString(16);
        res.cookie(this.stateKey, state);
        const scope = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: this.client_id,
            scope: scope,
            redirect_uri: this.redirect_uri,
            state: state
          }));
    };

    searchArtist = async ( req , res ) =>{  
        const { access_token } = await this.api.getToken();
        const apiUrl = this.api_url + '/search?';
        console.log( req.body );
        const params = querystring.stringify( req.body );
        const method = Methods.GET;
        const url = apiUrl + params;
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

    getAlbums = async ( req , res ) =>{  
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

    getToken = async (req ,res ) => { 
        try{
            const response = await this.api.getToken();
            res.json( response);
        }catch( e) {
            res.json( e )
        }
    }
}


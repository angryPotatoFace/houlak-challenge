import querystring from 'querystring';
import config from '../../config';
import Api from '../api/api';

export default class Controller{
    
    private client_id: string
    private client_secret: string
    private redirect_uri: string
    private stateKey: string
    private api: Api
  
    constructor(){
        this.client_id = config.CLIENT_ID;
        this.client_secret = config.CLIENT_SECRET;
        this.redirect_uri = config.REDIRECT_URI;
        this.stateKey = 'spotify_auth_state';
        this.api = new Api();
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
        const apiUrl = 'https://api.spotify.com/v1/search?';
        const params = querystring.stringify( req.body );
        const method = 'GET';
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

    getToken = async (req ,res ) => { 
        try{
            const response = await this.api.getToken();
            res.json( response);
        }catch( e) {
            res.json( e )
        }
    }
}


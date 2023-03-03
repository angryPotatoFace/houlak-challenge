import { Router } from "express"
import Controller from "../controller/controller";

export default class RouterApp {
    router: Router;
    controller: Controller

    constructor(){
        this.router = Router();
        this.controller = new Controller();
    }

    start() {
        // GET
            this.router.get('/', (req, res) => {  res.send('Hello Word!') });
            this.router.get('/login', this.controller.login );
            this.router.get('/getToken', this.controller.getToken );
            this.router.get('/getAlbums/:id/:limit', this.controller.getAlbums );

        // POST
            this.router.post('/searchArtist', this.controller.searchArtist );
            this.router.post('/getIdAlbumsByPopularity', this.controller.getIdAlbumsByPopularity );

        // PUT 

        // DELETE
        
        return this.router;
    }
}
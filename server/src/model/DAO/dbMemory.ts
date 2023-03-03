
export default class DbMemory{
    private historyRequest;

    constructor(){
        this.historyRequest = [];
    }

    uploadRequest( data: historical ) {
        this.historyRequest.push(data);
    }

    getHistorical() {
        console.log('entro en model');
        return this.historyRequest;
    }

}

interface historical {
    ip: string;
    date: string;
    artist: string;
}
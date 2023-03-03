import { log } from "../tables";

export default class DbMaria {

    private table

    constructor(){
        this.table = log();
    }

    async uploadRequest( data: historical) {
        const log = new this.table(data);
        await log.save();
    }

    async getHistorical() {
        const data = await this.table.findAll();
        return data;
    }
}

interface historical {
    ip: string;
    date: string;
    artist: string;
}
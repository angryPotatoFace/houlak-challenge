import DbMemory from "./dbMemory";
import DbMaria from "./dbMaria";

export default class Factory {

    static get = ( model ) => {
        switch(model){
            case "Memory": 
                console.log("DB Initialized - Memory ")
                return new DbMemory();
            case "Maria":
                console.log("DB Initialized - Maria")
                return new DbMaria();

            default: 
                console.log("Initialized Memory DB")
                return new DbMemory();
        }
    }

}
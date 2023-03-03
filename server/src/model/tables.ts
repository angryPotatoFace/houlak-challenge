import Connection from "./connection";
import { DataTypes } from 'sequelize';


export const log = () => {
    const connection = Connection.get();
    const table = connection.define('log', {
        ip: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        artist: {
            type: DataTypes.STRING
        }
    })
    
    return table;
};
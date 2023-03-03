import { Sequelize } from 'sequelize';
import config from '../../config';

export default class Connection{
    static get = () => {
      const db = new Sequelize( config.DB_NAME, config.DB_USER, config.DB_PASS, {
        host: config.DB_HOST,
        dialect: 'mariadb'
      });
      console.log(' ******* Data Base connected correctly ');
      return db;
    }
}

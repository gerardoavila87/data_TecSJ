import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const coreDB = new Sequelize(
  process.env.CORE_DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      connectTimeout: 30000 // 20 segundos
    }
  }
);

const coreBackupDB = new Sequelize(
  process.env.COREBACKUP_DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      connectTimeout: 30000 // 20 segundos
    }
  }
);

const dataDB = new Sequelize(
  process.env.DATA_DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false,
    dialectOptions: {
      connectTimeout: 30000, // 20 segundos
      initSql: ['SET lc_time_names = "es_ES"']
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);

const connectDB = async () => {
  try {
    await coreDB.authenticate();
    console.log('CoreDB connected to core database successfully.');

    await dataDB.authenticate();
    console.log('DataDB Connected to data database successfully.');    
    
    await dataDB.query("SET lc_time_names = 'es_ES';");
    console.log('Idioma configurado a español para dataDB.');
    /*
        await coreBackupDB.authenticate();
        console.log('CoreDB connected to coreBackupDB database successfully.');
      */
  } catch (error) {
    console.error('Unable to connect to the databases:', error);
    process.exit(1);
  }
};

export { coreDB, dataDB, coreBackupDB, connectDB };

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    secretKey: process.env.SECRET_KEY,
    servieName: process.env.SERVICE_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    atlasCluster: process.env.ATLAS_CLUSTER
}
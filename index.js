const developmentEnvironments = [
    'local',
    'development'
]

if (developmentEnvironments.includes(process.env.NODE_ENV)){
    require('dotenv').config();
}

const app = require('./src/app');
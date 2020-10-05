const { isDevelopment } = require('./src/utils');

if (isDevelopment()){
    require('dotenv').config();
}

require('./src/app');
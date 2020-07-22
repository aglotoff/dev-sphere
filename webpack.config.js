module.exports = (env = {}) => [
    require('./webpack/client.config')(env),
    require('./webpack/server.config')(env),
];

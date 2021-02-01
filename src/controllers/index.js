const { 
    login,
} = require('./auth');

const {
    generateNewKey,
    getAllKeys,
    disableKey
} = require('./keys');

const {
    getAllRequests,
    getAllRequestsFromKeyId,
} = require('./requests');

const {
    handleProxyRequest,
} = require('./proxy');


module.exports = {
    login,

    generateNewKey,
    getAllKeys,
    disableKey,

    getAllRequestsFromKeyId,
    getAllRequests,

    handleProxyRequest,
};
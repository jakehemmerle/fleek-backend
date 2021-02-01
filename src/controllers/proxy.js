const { Key, Request } = require('../models');


const handleProxyRequest = async (req, res, next) => {
    console.log('Forwarding to IPFS...');

    // This could also be packed into a passport.js auth strategy, but since this is the
    // only endpoint we need to secure with an API key, this is fine
    const clientKey = req.headers['x-fleek-api-key-header'];
    if (!clientKey) {
        return res.status(401).send('Specify API key in \'x-fleek-api-key-header\' in the request header');
    }
    const key = await Key.findOne({ 
        where: {
            key: clientKey,
        },
    });

    if (!key || !key.enabled) {
        return res.status(401).send();
    }

    // no await, we don't need request logging to be synchronous
    const requestSize = req.body.length || 0;
    Request.create({
        keyId: key.id,
        type: `${req.path}`,
        size: requestSize,
    });
    Key.findOne({ where: { key: clientKey } })
        .then((key) => {
            Key.update({
                requestCount: key.requestCount + 1,
                totalBytesTransfered: key.totalBytesTransfered + requestSize,
            }, { where: { key: clientKey } });
        });

    next();
}


module.exports = {
    handleProxyRequest
};
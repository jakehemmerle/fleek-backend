const passport = require('passport');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { param, query } = require('express-validator');

const {
    login,
    generateNewKey,
    getAllKeys,
    disableKey,
    getAllRequestsFromKeyId,
    getAllRequests,
    handleProxyRequest,
} = require('../controllers');

const { IPFS_API_URL } = process.env;


// catch any unhandled controller errors
const catchWrapper = (handler) => async (req, res, next) => {
    try {
        return await handler.call(this, req, res, next);
    } catch (err) {
        console.error(`Unhandled controller error at ${req.path}: ${err}`);
        return next(err);
    }
};


module.exports = (app) => {

    app.get('/ping',
        catchWrapper((req, res) => {
            return res.send('pong');
        }
    ));

    app.post('/login',
        passport.authenticate('local', { session: false }),
        query('username').exists().notEmpty().isString(),
        query('password').exists().notEmpty().isString(),
        catchWrapper(login),
    );

    app.get('/keys',
        passport.authenticate('jwt'),
        catchWrapper(getAllKeys),
    );

    // perhaps this shouldn't be DELETE?
    app.delete('/keys/:keyId',
        passport.authenticate('jwt'),
        param('keyId').exists(),
        catchWrapper(disableKey),
    )

    app.post('/keys',
        passport.authenticate('jwt'),
        catchWrapper(generateNewKey),
    );

    app.get('/keys/:keyId/requests',
        passport.authenticate('jwt'),
        param('keyId').exists(),
        catchWrapper(getAllRequestsFromKeyId),
    )

    app.get('/requests',
        passport.authenticate('jwt'),
        catchWrapper(getAllRequests),
    )

    app.use('/api/v0',
        // auth inside of handleProxy
        catchWrapper(handleProxyRequest),
        createProxyMiddleware({
            target: IPFS_API_URL,
            changeOrigin: false,
        }),
    );
};
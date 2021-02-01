const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;


const login = (req, res) => {
    // if we had a DB, we would query the user and pack info into the jwt body
    const dummyPayload = 'Pneumonoultramicroscopicsilicovolcanoconiosis';
    const token = jwt.sign(dummyPayload, JWT_SECRET);
    return res.json(token);
}


module.exports = {
    login
};
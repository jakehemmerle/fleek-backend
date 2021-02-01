const base64url = require('base64url');
const crypto = require('crypto');
const { Key } = require('../models');


const generateNewKey = async (req, res) => {
    // 128 bits from CSPRNG is plenty of security for this use case
    const rawKey = crypto.randomBytes(16);
    const key = base64url(rawKey);
    const newKey = await Key.create({ key });

    return res.json(newKey);
}

const getAllKeys = async (req, res) => {
    const keys = await Key.findAll();
    return res.set("X-Total-Count", keys.length).json(keys);
}

// return 404 if key does not exist?
const disableKey = async (req, res) => {
    const { keyId: id } = req.params;
    Key.update({ enabled: false }, {
        where: {
            id
        },
    }).then(key => console.log(key));

    return res.send();
}


module.exports = {
    generateNewKey,
    getAllKeys,
    disableKey
}
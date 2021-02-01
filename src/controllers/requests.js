const { Request } = require('../models');


const getAllRequests = async (req, res) => {
    const requests = await Request.findAll();
    // return even if empty
    return res.json(requests);
}

const getAllRequestsFromKeyId = async (req, res) => {
    const { keyId } = req.params;
    const requests = await Request.findAll({ where: { keyId }});
    // return even if empty
    return res.json(requests);
}


module.exports = {
    getAllRequests,
    getAllRequestsFromKeyId,
};
const genericHandler = async (modelFunction, req, res, errorMessage) => {
    try {
        const data = await modelFunction(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: errorMessage });
    }
};

module.exports = genericHandler;
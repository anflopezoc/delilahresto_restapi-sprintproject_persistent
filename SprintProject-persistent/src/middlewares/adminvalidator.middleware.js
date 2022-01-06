exports.adminvalidator = async (req, res, next) => {
    const isAdmin = req.user.isAdmin
    if (isAdmin == false) res.status(404).json('Invalid access')
    else next()
};



const adminCheck = (req, res, next) => {
    const isAdmin = req.user.userData[7]

    try {
        if (!isAdmin) {
            return res.status(403).json({message: 'Cannot Access. Need Admin Access'})
        } else {
            return res.status(403)
        }
    } catch (err) {
        return res.status(403).json({message: 'Cannot Access. Need Admin Access'})
    }

    return next();
};

module.exports = adminCheck;

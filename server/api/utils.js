const requireAdmin = (async (req, res, next) => {
    console.log(req.userInfo)
    if (!req.userInfo.isAdmin) {
        next({
           message: 'You must be an admin to perform this actions' 
        });
    }
    next();
});

const requireUser = ((req, res, next) => {
    if (!req.user) {
        next({
           message: 'You must be logged in to perform this actions' 
        });
    }
    next();
});

module.exports = {
    requireAdmin,
    requireUser
};
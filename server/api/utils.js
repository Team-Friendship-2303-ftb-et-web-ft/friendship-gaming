const requireUser = ((req, res, next) => {
    if (!req.user && req.user.isAdmin == false) {
        next({
           message: 'You must be logged in to perform this actions' 
        });
    }
    next();
});

module.exports = {
    requireUser
};
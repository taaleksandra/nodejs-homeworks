const passport = require("passport");

module.exports = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    try {
      if (user.token === null) {
        return res.status(401).json({
          status: "error",
          code: 401,
          ResponseBody: {
            message: "Unauthorized: Invalid token",
          },
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

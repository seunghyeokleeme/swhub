export const privateOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};

export const publicOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/products/");
  }
  next();
};

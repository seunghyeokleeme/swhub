export const getHome = (req, res, next) => {
  return res.redirect("/products/");
};
export const getJoin = (req, res, next) => {
  return res.redirect("/auth/join");
};
export const getLogin = (req, res, next) => {
  return res.redirect("/auth/login");
};
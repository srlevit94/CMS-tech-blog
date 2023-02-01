const withAuth = (req, res, next) => {
  // checks if logged in, otherwise redirects them to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

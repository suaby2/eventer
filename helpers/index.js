function getSession(req, res, next) {
  // console.log("REQ_SESSION =>>>", req.session);
  // console.log("REQ_SESSION_USER =>>>", req.session.user);
  if(req.session && !req.session.user) {
    res.redirect('/login');
  }
  next();
}

module.exports = getSession;

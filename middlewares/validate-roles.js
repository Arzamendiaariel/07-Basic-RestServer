const { response } = require('express');
const { itsValidRole } = require('../helpers/db-validators');

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: 'Validating role without validaten token' });
  }
  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} isn't administrator - anauthorized opperation`,
    });
  }
  next();
};
const hasRole = (...roles) => {
  //first we check if the roles we send as props are registered in the DB
  roles.forEach((role) => {
    itsValidRole(role);
  });
  return (req, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: 'Validating role without validaten token' });
    }
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ msg: `Service require one of this ${roles}` });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};

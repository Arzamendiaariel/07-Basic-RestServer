const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  res.json({
    msg: 'Get API - controlador',
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};
const postUsers = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: 'Post API - controlador',
    nombre,
    edad,
  });
};
const putUsers = (req = request, res = response) => {
  const { id } = req.params; //string

  res.json({
    msg: 'Put API - controlador',
    id,
  });
};
const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'Patch API - controlador',
  });
};
const deleteUsers = (req = request, res = response) => {
  res.json({
    msg: 'Delete API - controlador',
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};

module.exports = (req, res, next) => {
  if (req.user?.rol !== 'COORDINADOR') {
    return res.status(403).json({ message: 'Acceso denegado, solo coordinadores' });
  }
  next();
};

const tratarErro = (err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ erro: err.message || 'Erro interno do servidor' });
};

export default tratarErro;
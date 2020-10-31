function apiNotFound(req, res) {
  res.status(400).send('API NOT FOUND!');
}

export default function errorHandler(app) {
  app.use(apiNotFound);
}

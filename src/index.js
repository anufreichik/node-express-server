import express from 'express';
import home from './modules/home/home';
import info, { infopost } from './modules/info/info';
import errorHandler from './modules/core/errorHandler';
import logger from './modules/core/logger';
import parseResponse from './modules/core/parseResponse';
import cors from './modules/core/cors';
import calculator from './modules/calculator/calculator';
import routes from './modules/core/routes';
import dbConnect from './modules/core/db';

const app = express();
const PORT = 5000;

dbConnect();
logger(app);
parseResponse(app);
cors(app);
//router first level
routes(app);
// app.get('/', home); // GET localhost:5000/
// app.get('/info', info);
// app.post('/infopost', infopost);
// app.post('/calculator', calculator);
errorHandler(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

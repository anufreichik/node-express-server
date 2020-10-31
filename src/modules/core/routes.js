import infoRouter from '../info/infoRoutes';
import userRouter from '../user/userRoutes';
import calculatorRouter from '../calculator/calculatorRoutes';

export default function routes(app) {
  app.use('/info', infoRouter);
  app.use('/calculator', calculatorRouter);
  app.use('/user', userRouter);
}

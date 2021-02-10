import infoRouter from '../info/infoRoutes';
import userRouter from '../user/userRoutes';
import baseRouter from '../base/Routers';
import bookRouter from '../book/Routers';
import authorRouter from '../author/Routers';
import orderRouter from '../order/Routers';
import calculatorRouter from '../calculator/calculatorRoutes';

export default function routes(app) {
  app.use('/info', infoRouter);
  app.use('/calculator', calculatorRouter);
  app.use('/user', userRouter);
  app.use('/base', baseRouter);
  app.use('/book', bookRouter);
  app.use('/author', authorRouter);
  app.use('/order', orderRouter);
}

import Order from './Model';
import mongoose from 'mongoose';
import Book from '../book/Model';

export default function create(req, res) {
  const _id = new mongoose.Types.ObjectId();

  const newOrder = new Order({
    name: req.body.name,
    status: req.body.status,
    books: req.body.books,
  });

  newOrder
    .save()
    .then(() => {
      res.status(200).json('Order created!!');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Order not created');
    })
    .finally(() => {
      console.log('finally');
    });
}

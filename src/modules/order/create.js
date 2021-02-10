import Order from './Model';
import mongoose from 'mongoose';
import Book from '../book/Model';

export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();

  const orderBooks = [];

  const promises = req.body.books.map((book) => {
    return Book.findById(book)
      .exec()
      .then((doc) => {
        if (doc) {
          console.log(doc, 'doc book find by id');
          const orderItem = { book: book, paidPrice: Number(doc.sellPrice) };
          orderBooks.push(orderItem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  await Promise.all(promises);

  const newOrder = new Order({
    _id: _id,
    name: req.body.name,
    status: req.body.status,
    books: orderBooks,
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

import Author from './Model';
import Book from '../book/Model';
import mongoose from 'mongoose';

export default function create(req, res) {
  const _id = new mongoose.Types.ObjectId();
  //CREATE NEW AUTHOR
  let newAuthor = new Author({
    _id: _id,
    name: req.body.name,
    books: req.body.books,
  });

  //check that list of books that sent exists, otherwise remove from array
  req.body.books.forEach((book) => {
    Book.findById(book)
      .exec()
      .then((doc) => {
        if (!doc) {
          newAuthor.books = newAuthor.books.filter((el) => el !== book);
        } else {
          //update book to add this author to book
          Book.findOneAndUpdate({ _id: book }, { $addToSet: { author: _id } })
            .exec()
            .then(() => console.log('updated'))
            .catch((err) => console.log(err));
        }
      });
  });

  //create Author
  newAuthor
    .save()
    .then(() => {
      res.status(200).json('Author created!!');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author not created');
    })
    .finally(() => {
      console.log('finally');
    });
}

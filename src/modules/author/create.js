import Author from './Model';
import Book from '../book/Model';
import mongoose from 'mongoose';

export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();
  const books = req.body.books;
  //CREATE NEW AUTHOR
  const newAuthor = new Author({
    _id: _id,
    name: req.body.name,
    books: books,
  });

  //check that list of books that sent exists, otherwise remove from array
  const promises = req.body.books.map((book) => {
    Book.findById(book)
      .exec()
      .then((doc) => {
        if (!doc) {
          newAuthor.books = books.filter((el) => el !== book);
        } else {
          //update book to add this author to book
          Book.findOneAndUpdate({ _id: book }, { $addToSet: { author: _id } })
            .exec()
            .then(() => console.log('updated'))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        newAuthor.books = books.filter((el) => el !== book);
        //res.status(400).json(err);
      });
  });

  await Promise.all(promises);

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

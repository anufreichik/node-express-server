import mongoose from 'mongoose';
import Book from './Model';
import Author from '../author/Model';
export default function create(req, res) {
  const _id = new mongoose.Types.ObjectId();

  const newBook = new Book({
    _id: _id,
    name: req.body.name,
    author: req.body.author, //sending array of authors
  });

  //loop through authors array that came in body of request
  //check if each author found in Authors collection
  //if found update book list for this author
  //if not found remove it from incoming array
  req.body.author.forEach((author) => {
    Author.findById(author)
      .exec()
      .then((doc) => {
        if (doc) {
          doc.books = [...doc.books, _id];
          doc.save().catch((err) => {
            throw new Error(err);
          });
        } else {
          newBook.author = newBook.author.filter((el) => el !== author);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json('Author update error');
      });
  });

  //ALTERNATIVE TO UPDATE

  // Author.findOneAndUpdate(
  //   { _id: author },
  //   { $addToSet: { books: _id } },
  //   { runValidators: true },
  // )
  //   .exec()
  //   .then((doc) => {
  //     if (doc) {
  //     } else {
  //     }
  //   })
  //   .catch((error) => {});

  //create book
  newBook
    .save()
    .then(() => {
      res.status(200).json('Book created!!');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book not created');
    })
    .finally(() => {
      console.log('finally');
    });
}

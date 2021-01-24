import mongoose from 'mongoose';
import Book from './Model';
import Author from '../author/Model';
export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();

  let authors = req.body.author;

  //loop through authors array that came in body of request
  //check if each author found in Authors collection
  //if found update book list for this author
  //if not found remove it from incoming array

  const newBook = new Book({
    _id: _id,
    name: req.body.name,
    author: authors, //sending array of authors
  });

  const promises = req.body.author.map(async (author) => {
    await Author.findById(author)
      .exec()
      .then((doc) => {
        if (doc) {
          doc.books = [...doc.books, _id];
          doc.save().catch((err) => {
            newBook.author = authors.filter((el) => el !== author);
            //throw new Error(err);
          });
        } else {
          newBook.author = authors.filter((el) => el !== author);
        }
      })
      .catch((err) => {
        newBook.author = authors.filter((el) => el !== author);
        //res.status(400).json(err);
      });
  });

  await Promise.all(promises);

  //create book
  newBook
    .save()
    .then(() => {
      res.status(200).json('Book created!!');
    })
    .catch((err) => {
      res.status(400).json('Book not created');
    })
    .finally(() => {
      console.log('finally');
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
}

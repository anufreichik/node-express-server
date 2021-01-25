import Author from './Model';
import Book from '../book/Model';

export default async function updateById(req, res) {
  const authorId = req.params.authorId;
  const books = req.body.books;
  const updatedAuthor = {
    name: req.body.name,
    books: books,
  };

  await Author.findById(authorId)
    .exec()
    .then((doc) => {
      //---------------------------------------------------------------
      req.body.books.forEach((book) => {
        if (!doc.books.includes(book)) {
          Book.findOneAndUpdate({ _id: book }, { $addToSet: { author: authorId } })
            .exec()
            .then((doc) => {
              if (doc) {
                console.log('books list updated');
              } else {
                console.log('books list not updated');
              }
            })
            .catch((error) => {
              console.log('error in catch of author find oneAndUpdate');
              updatedAuthor.books = books.filter((el) => el !== book);
            });
        }
      });
      //----------------------------------------------------------------
      //---------------------------------------------------------------
      doc.books.forEach((book) => {
        if (!req.body.books.includes(book)) {
          Book.findOneAndUpdate({ _id: book }, { $pull: { books: authorId } })
            .exec()
            .then((doc) => {
              if (doc) {
                console.log('books list updated');
              } else {
                console.log('books list not updated');
              }
            })
            .catch((error) => {
              console.log('error in catch of book find oneAndUpdate');
              updatedAuthor.books = books.filter((el) => el !== book);
            });
        }
      });
      //------------------------------------------------------------
    });

  Author.updateOne({ _id: authorId }, req.body)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author update error');
    });
}

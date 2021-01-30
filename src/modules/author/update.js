import Author from './Model';
import Book from '../book/Model';

export default async function updateById(req, res) {
  const authorId = req.params.authorId;
  //const books = req.body.books;
  const newBooksList = [];

  await Author.findById(authorId)
    .exec()
    .then(async (doc) => {
      //---------------------------------------------------------------
      const promise1 = req.body.books.map((book) => {
        if (!doc.books.includes(book)) {
          Book.findOneAndUpdate({ _id: book }, { $addToSet: { author: authorId } })
            .exec()
            .then((doc) => {
              if (doc) {
                newBooksList.push(book);
                console.log('books list updated');
              } else {
                console.log('books list not updated');
              }
            })
            .catch((error) => {
              console.log('error in catch of book find oneAndUpdate');
              // updatedAuthor.books = books.filter((el) => el !== book);
            });
        } else {
          newBooksList.push(book);
        }
      });
      //----------------------------------------------------------------
      //---------------------------------------------------------------
      const promise2 = doc.books.map((book) => {
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
              //  updatedAuthor.books = books.filter((el) => el !== book);
            });
        }
      });
      //------------------------------------------------------------
      await Promise.all([promise1, promise2]);
      console.log('finishing...');
    });

  const updatedAuthor = {
    name: req.body.name,
    books: newBooksList,
  };

  Author.updateOne({ _id: authorId }, updatedAuthor)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author update error');
    });
}

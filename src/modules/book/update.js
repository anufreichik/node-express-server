import Book from './Model';
import Author from '../author/Model';
export default async function updateById(req, res) {
  const bookId = req.params.bookId;
  const newAuthorsList = [];

  await Book.findById(bookId)
    .exec()
    .then(async (doc) => {
      //loop through list of authors that came in request and if author not found in current list of authors add book to him

      const promise1 = req.body.author.map((author) => {
        if (!doc.author.includes(author.toString())) {
          return Author.findOneAndUpdate(
            { _id: author },
            { $addToSet: { books: bookId } },
          )
            .exec()
            .then((doc) => {
              if (doc) {
                console.log('books list in author collection updated');
                newAuthorsList.push(author);
              } else {
                console.log('books list not updated');
              }
            })
            .catch((error) => {
              console.log('error in catch of author find oneAndUpdate');
              //updatedBook.author = authors.filter((el) => el !== author);
            });
        } else {
          newAuthorsList.push(author);
        }
      });

      //loop through the current list of authors and if author not found in incoming list remove book from him

      const promise2 = doc.author.map((author) => {
        if (!req.body.author.includes(author.toString())) {
          //new list of authors not include this author => remove book from him
          return Author.findOneAndUpdate({ _id: author }, { $pull: { books: bookId } })
            .exec()
            .then((doc) => {
              if (doc) {
                console.log(
                  'books list in author collection updated  - book removed from list!',
                );
              } else {
                console.log('books list not updated!');
              }
            })
            .catch((error) => {
              console.log('error in catch of author find oneAndUpdate');
              //updatedBook.author = authors.filter((el) => el !== author);
            });
        }
      });
      await Promise.all([...promise1, ...promise2]);
    });

  const updatedBook = {
    name: req.body.name,
    author: newAuthorsList,
  };

  Book.updateOne({ _id: bookId }, updatedBook)
    .exec()
    .then((result) => {
      console.log(updatedBook, 'book updated!!!!');
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book update error');
    });
}

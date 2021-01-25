import Book from './Model';
import Author from '../author/Model';
export default async function updateById(req, res) {
  const bookId = req.params.bookId;
  const authors = req.body.author;
  const updatedBook = {
    name: req.body.name,
    author: authors,
  };

  await Book.findById(bookId)
    .exec()
    .then((doc) => {
      //loop through list of authors that came in request and if author not found in current list of authors add book to him
      req.body.author.forEach((author) => {
        if (!doc.author.includes(author)) {
          Author.findOneAndUpdate({ _id: author }, { $addToSet: { books: bookId } })
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
              updatedBook.author = authors.filter((el) => el !== author);
            });
        }
      });

      //loop through the current list of authors and if author not found in incoming list remove book from him
      doc.author.forEach((author) => {
        if (!req.body.author.includes(author)) {
          //new list of authors not include this author => remove book from him
          Author.findOneAndUpdate({ _id: author }, { $pull: { books: bookId } })
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
              updatedBook.author = authors.filter((el) => el !== author);
            });
        }
      });
    });

  Book.updateOne({ _id: bookId }, updatedBook)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book update error');
    });
}

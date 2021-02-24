import Book from './Model';
import Author from '../author/Model';
import Order from '../order/Model';
export default async function deleteById(req, res) {
  //const bookId = req.params.bookId;
  const { bookId = '' } = req.params;

  const findResult = Order.find({ 'books.book': bookId })
    .exec()
    .then((doc) => {
      if (doc.length) {
        res.status(400).json('Cant Delete Book because this book in Order');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Order find error');
    });

  await Promise.all([findResult]);

  //if (promise) return; //book found in order so dont delete book

  Book.findById(bookId)
    // .populate('author')
    .exec()
    .then((doc) => {
      doc.author.forEach((author) => {
        //update author's book list to remove this book before removing it from books collection
        Author.update(
          { _id: author },
          { $pull: { books: bookId } },
          { runValidators: true },
        )
          .exec()
          .then((doc) => {
            if (doc) {
              console.log('updated');
            } else {
              console.log('not updated');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author get by id error');
    });

  Book.deleteOne({ _id: bookId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book delete error');
    });
}

import Author from './Model';
import Book from '../book/Model';

export default function deleteById(req, res) {
  //const authorId = req.params.authorId;

  const { authorId = '' } = req.params;

  Author.findById(authorId)
    .exec()
    .then((doc) => {
      doc.books.forEach((book) => {
        Book.update({ _id: book }, { $pull: { author: authorId } })
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
    });

  Author.deleteOne({ _id: authorId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author delete error');
    });
}

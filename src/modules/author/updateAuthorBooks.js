import Author from './Model';
import { get } from 'lodash';

export default function updateAuthorBooks(req, res) {
  const authorId = req.params.authorId;
  const bookId = get(req, 'body.bookId', '');
  Author.updateOne({ _id: authorId }, { $addToSet: { books: bookId } })

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author update error');
    });
}

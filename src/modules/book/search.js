import Book from './Model';
import { escapeRegExp, get } from 'lodash';

export default function search(req, res) {
  const query = {};
  const name = get(req, 'body.name', '');
  //if (name) query.name = { $eq: name };
  if (name) query.name = { $regex: escapeRegExp(name), $options: 'i' };

  Book.find(query)
    .populate({
      path: 'author',
      model: 'Author',
      select: 'name', // to select fields and remove _id field
    })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book search error');
    });
}

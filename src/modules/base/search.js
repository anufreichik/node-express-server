import Base from './Model';
import { get } from 'lodash';
export default function search(req, res) {
  // формирование запроса
  const query = {};
  const name = get(req, 'body.name', '');
  if (name) query.name = { $eq: name };

  Base.find(query)
    //.limit(limit)
    //.skip(limit * (page - 1))
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Base search error');
    });
}

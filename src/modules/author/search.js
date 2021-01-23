import Author from './Model';

export default function search(req, res) {
  Author.find()
    .populate({
      path: 'Book',
      options: { limit: 2 },
    })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author search error');
    });
}

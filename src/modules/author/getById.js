import Author from './Model';

export default function authorGetById(req, res) {
  const authorId = req.params.authorId;

  Author.findById(authorId)
    //.find({ email: 'm@m.com' })
    //.limit(1)
    //.skip(1)
    .populate('Book')
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author get by id error');
    });
}

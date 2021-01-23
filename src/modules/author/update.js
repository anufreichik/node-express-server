import Author from './Model';

export default function updateById(req, res) {
  const authorId = req.params.authorId;
  Author.updateOne({ _id: authorId }, req.body)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Author update error');
    });
}

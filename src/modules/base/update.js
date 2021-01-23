import Base from './Model';

export default function updateById(req, res) {
  const baseId = req.params.baseId;
  Base.updateOne({ _id: baseId }, req.body)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Base update error');
    });
}

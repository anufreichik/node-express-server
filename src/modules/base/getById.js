import Base from './Model';

export default function baseGetById(req, res) {
  const baseId = req.params.baseId;

  Base.findById(baseId)
    //.find({ email: 'm@m.com' })
    //.limit(1)
    //.skip(1)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Base get by id error');
    });
}

import User from './Model';

export default function userGetById(req, res) {
  const userId = req.params.userId;

  User.findById(userId)
    //.find({ email: 'm@m.com' })
    //.limit(1)
    //.skip(1)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('User get by id error');
    });
}

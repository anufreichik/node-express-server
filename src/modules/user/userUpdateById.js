import User from './Model';

export default function userUpdateById(req, res) {
  const userId = req.params.userId;

  // User.findByIdAndUpdate(userId, req.body)
  //   //.find({ email: 'm@m.com' })
  //   //.limit(1)
  //   //.skip(1)
  //   .exec()
  //   .then((result) => {
  //     res.status(200).json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json('User update error');
  //   });

  delete req.body.password; //delete key:value pair from object

  User.updateOne({ _id: userId }, req.body)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('User update error');
    });
}

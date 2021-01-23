import Book from './Model';

export default function bookGetById(req, res) {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .populate('Author')
    //.find({ email: 'm@m.com' })
    //.limit(1)
    //.skip(1)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Book get by id error');
    });
}

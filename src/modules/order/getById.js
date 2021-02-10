import Order from './Model';

export default function orderGetById(req, res) {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    //.find({ email: 'm@m.com' })
    //.limit(1)
    //.skip(1)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Order get by id error');
    });
}

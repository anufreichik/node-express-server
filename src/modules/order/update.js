import Order from './Model';

export default function updateById(req, res) {
  const orderId = req.params.orderId;
  Order.updateOne({ _id: orderId }, req.body)

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Order update error');
    });
}

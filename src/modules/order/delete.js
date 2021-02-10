import Order from './Model';

export default function deleteById(req, res) {
  //const orderId = req.params.orderId;

  const { orderId = '' } = req.params;

  Order.deleteOne({ _id: orderId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Order delete error');
    });
}

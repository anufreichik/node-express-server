export default function calculator(req, res) {
  const a = req.body.a;
  const b = req.body.b;
  const sign = req.body.sign;
  let result = 'unknown';
  switch (sign) {
    case 'plus':
      result = a + b;
      break;
    case 'minus':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      result = a / b;
      break;
    default:
      break;
  }

  res.send('Calculation was: ' + result);
}

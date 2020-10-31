//controller(function that working on request)
let count = 0; //controller data maniplation in memory
const names = [];
export default function info(req, res) {
  names.push(req.body.name);
  //res.send('Info Here!' + count++);
  res.status(200).json(names);
}

export function infopost(req, res) {
  const a = req.body.a;
  const b = req.body.b;
  const sum = a + b;
  res.send('Info POST SUM of a and b: ' + sum);
}

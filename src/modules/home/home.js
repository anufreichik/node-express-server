export default function home(req, res) {
  //res.status(200).send('123');
  res.status(200).json({
    name: 'PASV',
    components: ['asdf', 'sdf', 'sdf'],
    q: true,
  });
}

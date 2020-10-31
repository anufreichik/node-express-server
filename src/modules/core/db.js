import mongoose from 'mongoose';

function dbConnect() {
  mongoose.connect('mongodb://localhost/express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('CONNECTED');
});
export default dbConnect;

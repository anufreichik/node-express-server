import mongoose from 'mongoose';
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: String,
});
//create index programmatically
//userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('User', userSchema);

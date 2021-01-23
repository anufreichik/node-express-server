import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
      },
    ],
  },
  { timestamps: {} },
);
//create index programmatically
//userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('Book', bookSchema);

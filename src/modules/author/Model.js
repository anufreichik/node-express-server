import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
      },
    ],
  },
  { timestamps: {} },
);
//create index programmatically
//userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('Author', authorSchema);

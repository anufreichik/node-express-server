import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'received', 'sent', 'lost'],
    },
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        // book: { type: [Book], required: true },
        paidPrice: Number,
      },
    ],
  },
  { timestamps: {} },
);
//create index programmatically
//userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('Order', orderSchema);

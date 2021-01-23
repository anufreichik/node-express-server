import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const baseSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: {} },
);
//create index programmatically
//userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('Base', baseSchema);

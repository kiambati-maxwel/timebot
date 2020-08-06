import mongoose from 'mongoose';

const { Schema } = mongoose;

const LnmodelsSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true,
});

const Lnmodel = mongoose.model('Lnmodel', LnmodelsSchema);

export default Lnmodel;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const lnSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mainModelName: {
    type: String,
  },
  time: {
    type: Number,
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

const timeModel = mongoose.model('timebox', lnSchema);

export default timeModel;

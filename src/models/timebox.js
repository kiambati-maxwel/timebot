import mongoose from 'mongoose';

const { Schema } = mongoose;

const lnSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mainModelName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const timeModel = mongoose.model('timebox', lnSchema);

export default timeModel;

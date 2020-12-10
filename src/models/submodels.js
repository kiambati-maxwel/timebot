import mongoose from 'mongoose';

const { Schema } = mongoose;

const submdlSchema = new Schema({
  mainMname: {
    type: String,
    // default: 'main module name'
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

const submodels = mongoose.model('submodels', submdlSchema);

export default submodels;

import mongoose from 'mongoose';

const connectDb = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('connected to database'))
    .catch((err) => {
      console.error('failed to connect with database');
      console.error(err);
    });
};

export default connectDb;
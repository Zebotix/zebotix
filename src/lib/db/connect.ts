import mongoose from 'mongoose';
export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('already connected');
      return mongoose.connection;
    }

    console.log('Loaded DB_URL:', process.env.DB_URL);

    const connectDb = await mongoose.connect(
      process.env.DB_URL ? process.env?.DB_URL! : 'mongodb://localhost:27017/zebotix-web'
    );

    console.log(connectDb.connection.host, connectDb.connection);

    return connectDb.connection;
  } catch (error) {
    console.log('error: ', error);
    process.exit(1);
  }
}

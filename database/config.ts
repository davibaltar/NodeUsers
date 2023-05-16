import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTIONSTRING || '');
    // await mongoose.connect(process.env.DB_CONNECTIONSTRING!);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log(error);
    throw new Error('Error conectando a MongoDB');
  }
};

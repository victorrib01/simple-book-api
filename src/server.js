import { connect } from 'mongoose';
import { listen } from './app';
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

require('dotenv').config()

const  express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');


connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import productsRoutes from './routes/productsRoutes.js';
import pharmaciesRoutes from './routes/pharmaciesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRouter from './routes/checkoutRoutes.js';
import reviews from './routes/reviewsRouters.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.use(productsRoutes);
app.use(pharmaciesRoutes);
app.use(cartRoutes);
app.use(checkoutRouter);
app.use(reviews);


app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

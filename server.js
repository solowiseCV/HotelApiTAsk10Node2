import express, {Router} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middleware/createError.js';
import database from './database/connection.js';
import baseRoute from './routes/index.js'
import dotenv from 'dotenv' 
dotenv.config();

const app = express();
 
const router = Router();
const rootRouter = baseRoute(router);


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// routes
app.use("/api", rootRouter);
app.use('*', (req, res) => {
    res.status(404).send('Resource URL not found');
  });




//Error middleware
app.use(errorHandler);


//Database connection function
  database()


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
     console.log(`Server running on port ${PORT} 🔥 ` )
})

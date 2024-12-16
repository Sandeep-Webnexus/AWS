import app from './app'; 
import dotenv from 'dotenv';
import {connectToDB} from './config/database';
dotenv.config();

connectToDB();


// console.log(process.env.DB_USER);  // Should log your DB user
// console.log(process.env.DB_HOST);  // Should log your DB host
// console.log("Hello world!");

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
});

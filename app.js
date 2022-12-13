import express from 'express';
import path from "path";

const app = express();

// Middlewares
app.use(express.static('public'));


const port = 3000;
app.listen(port, () => {
  console.log(`PCAT listening on port: ${port}`);
});

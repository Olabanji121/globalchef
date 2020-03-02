const express = require("express");
const morgan = require("morgan");
const classRouter = require("./routes/classRoute");
const userRouter = require("./routes/userRoute");
const connectDB = require("./db");
const dotenv = require("dotenv");
const path = require('path')

dotenv.config({ path: "./config.env" });
const app = express();

connectDB();

// morgan middleware for logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser middleware, reading data from body into req.body
app.use(express.json({ extended: false, limit: "10kb" }));

// mount routes
app.use("/api/class", classRouter);
app.use("/api/users", userRouter);
// app.use('/api/v1/reviews', reviewRouter);


console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
 


const port = process.env.PORT; 

app.listen(port, ()=>{
    console.log(`Server stated on port  ${port}`);
});

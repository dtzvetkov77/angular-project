const express = require("express");
const cors = require("cors");
const router = require("./router");
const {initializeDatabase} = require("./config/database");



const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(router);

const port = 5000;
initializeDatabase()
.then(()=> {
    app.listen(port, () => {
      console.log("Website served on http://localhost:" + port);
      console.log('DB connected');
    });
})
.catch((err) => {
    console.log('Cannot connect to db:', err);
});





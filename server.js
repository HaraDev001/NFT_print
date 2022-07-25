const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var User = require('./models/user.js');
const bcrypt = require("bcryptjs");

const checkInfo = require("./routes/api/checkInfo");
const user = require("./routes/api/user");

var corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {    
    console.log("MongoDB successfully connected ...");
    // Initialize database
    async function mySeeder() {
      const data = await User.find({}).exec();
      if (data.length !== 0) {
          // Data exists, no need to seed.
          console.log("Users are registered already...")
          return;
      }
      const adminUser = {
        email: "admin@gmail.com",
        password: "admin12345",
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(adminUser.password, salt, (err, hash) => {
          if (err) throw err;
          adminUser.password = hash;
          new User(adminUser)
            .save()
            .then(user => console.log(`${adminUser.email} is registered`))
            .catch(err => console.log(err));
        });
      });
    }
    
    mySeeder();
  })
  .catch(err => console.log(err));


  // Routes
  app.use("/checkout", checkInfo);
  app.use("/users", user);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./router/emp");

require("dotenv").config();

const app = express();

// database init

app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);
const URL = 'mongodb://localhost/redux_crud'
const port = process.env.PORT || 5000;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
    app.listen(port, () => console.log(`Server is running on PORT: ${port}`))
}).catch((error) => {
    console.log('Error:', error.message)
})


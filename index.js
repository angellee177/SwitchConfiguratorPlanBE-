const express = require("express");
const app = express();

//MIDDLEWARE
app.use(express.json())

//PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
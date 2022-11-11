const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('view engine','ejs')

app.get('/',(req, res) => {
    // res.status(200).json('hello')
    res.render("index",{text: 'shot'});
});
const userRouter = require("./routes/users")
app.use("/users",userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

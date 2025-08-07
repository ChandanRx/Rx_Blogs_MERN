require('dotenv').config()
const express = require('express')
const dbconnect = require('./config/dbconnect')
const app = express()
const userRoutes = require("./routes/userRoutes")
const blogsRoutes = require("./routes/blogsRoutes")
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors')



app.use(cors({
  origin: 'https://rx-blogs.vercel.app/', 
  credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/blogs', userRoutes)
app.use("/api/addblog", blogsRoutes)
app.use('/api/comments', commentRoutes);

PORT = process.env.PORT || 5000

dbconnect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    })
})

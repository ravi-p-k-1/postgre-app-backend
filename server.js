const express = require('express');
const studentRoutes = require('./src/student/routes');
const cors = require('cors');

const app = express();

const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.use('/api/v1/students', studentRoutes);

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
});
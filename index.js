import express from 'express';
import mongoose from 'mongoose';

const PORT = 5000;
const app = express();
const DB_URL = '??';

app.use(express.json());
app.post('/', (req, res) => {
    res.status(200).json('Сервер работает');
})

async function startApp () {
    try {
        await mongoose(DB_URL);
        app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT} PORT`));
    } catch (e) {
        console.log(e);
    }
}

startApp();




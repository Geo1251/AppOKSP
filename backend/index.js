import express from 'express';
import sequelize from './database.js';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = 5000;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api', router);

async function startApp() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connected to DB');
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
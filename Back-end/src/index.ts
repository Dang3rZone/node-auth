require('dotenv').config();

import express from 'express';
import {createConnection} from 'typeorm';
import {routes} from "./routes";
import cors from 'cors';
import cookieParser from 'cookie-parser';

createConnection().then(() => {

    const app = express();

    app.use(express.json());

    app.use(cookieParser());

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
        credentials: true
    }));

    routes(app);

    app.listen(8000, () => {
        console.log('Server started on port 8000');
    });


});

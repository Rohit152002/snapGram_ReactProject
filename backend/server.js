import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import { PORT, mongodbUrl } from "./config.js";
import bookroute from './router/bookroute.js'
const app = express();
app.use(express.json())
app.use(cors())

app.use('/',bookroute)

mongoose
    .connect(mongodbUrl)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log("App is listening to port :" + PORT);
        })
    }).catch((err) => {
        console.error(err);
    })


app.get('/', (req, res) => {
    return res.status(234).send("Welcome to Mern Stack ");
})


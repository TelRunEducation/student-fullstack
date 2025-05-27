import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {router as studentRoutes} from "./routs/studentRouter.js"
import {MongoClient} from "mongodb";
import {init} from "./repository/studentRepository.js";

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());
app.use(studentRoutes);
dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);

//TODO
app.use((req, res) => {
    res.status(404).type(`text/plain`);
})

async function startServer() {
    try {
        await client.connect();
        //const db = client.db(process.env.DB_NAME);
        const db = client.db('students');
        init(db);
        app.listen(port, () => {
            console.log(`Server started on port ${port}. Press Ctrl-C to finish`);
        })
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
}

startServer().then();

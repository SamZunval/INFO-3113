import { readFile } from "node:fs/promises";
import express from "express";
import cors from "cors";
import {  retrieveUsers,
    retrieveUser,
    addUser,
    removeUser,
    updateUser,
    addImage,
    removeImage,
    retrieveImages,
    retrieveImage} from './data.js';

// The Express application object
const app = express();

// Configure Express APIs Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Handle CORS headers
app.use(express.static('public'));

// Configure our own custom middlware to log every request
app.use((req, _res, next) => {
    const timestamp = new Date(Date.now());
    console.warn(`[${timestamp.toDateString()} ${timestamp.toTimeString()}] / ${timestamp.toISOString()}`);
    console.log(req.method, req.hostname, req.path);
    console.log('headers:', req.headers);
    console.log('query:', req.query);
    console.log('body:', req.body);
    next();
});
// Endpoint Definitions
//users
app.get('/users', async (_request, response) => {
    let users = await retrieveUsers();
    response.json(users);
});

app.get('/users/:what', async (_request, response) => {
    const user_id = _request.params.what;
    let users = await retrieveUser(user_id);
    response.json(users);
});
app.post('/db/adduser', async (_request, response) => {
    try {
        await addUser(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.post('/db/removeuser', async (_request, response) => {
    try {
        await removeUser(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.post('/db/updateuser', async (_request, response) => {
    try {
        await updateUser(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
//Images
app.post('/db/addimage', async (_request, response) => {
    try {
        await addImage(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.post('/db/removeimage/:what', async (_request, response) => {
    try {
        const image_id = _request.params.what;
        await removeImage(image_id);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.get('/images/:what', async (_request, response) => {
    const user_id = _request.params.what;
    let images = await retrieveImages(user_id);
    response.json(images);
});
app.get('/image/:what', async (_request, response) => {
    const image_id = _request.params.what;
    let images = await retrieveImage(image_id);
    response.json(images);
});
/*
app.get('/bookmark', function (req, res) {//handles routing for the client
  res.sendFile("public/index.html",{ root: '.' });
});*/
const startServer = (port) => {
    app.listen(port, console.warn(`Listening on port ${port}`));
};

console.log('Completed API setup.');

export {
    startServer
}
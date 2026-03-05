import { readFile } from "node:fs/promises";
import express from "express";
import cors from "cors";
import { refreshDatabase, retrieveAlerts , retrieveAlert,addBookmark, retrieveBookmarks,retrieveBookmark,removeBookmark} from './data.js';

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
app.get('/about', (_request, response) => {
    response.sendFile("package.json", { root: '.' });
});
app.get('/about/:what', async (request, response) => {
    // Read the route params
    const field_key = request.params.what;

    let responseJson = {};
    try {
        // Read the package.json file, then convert into a JSON object to read a single field
        let pjFile = await readFile("package.json");
        let pjText = await pjFile.toString();
        let pjObject = await JSON.parse(pjText);

        // Extract the field of :what
        let value = pjObject[field_key];

        // Create a JSON object to responde with
        responseJson[field_key] = value;
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }

    response.json(responseJson);
});
app.get('/alerts', async (_request, response) => {
    let alerts = await retrieveAlerts();
    response.json(alerts);
});
app.get('/alerts/:what', async (_request, response) => {
    const country_code = _request.params.what;
    let alerts = await retrieveAlert(country_code);
    response.json(alerts);
});
app.post('/db/refresh', async (_request, response) => {
    try {
        await refreshDatabase();
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.get('/bookmarks', async (_request, response) => {
    let alerts = await retrieveBookmarks();
    response.json(alerts);
});
app.get('/bookmarks/:what', async (_request, response) => {
    const country_code = _request.params.what;
    let alerts = await retrieveBookmark(country_code);
    response.json(alerts);
});
app.post('/db/bookmark', async (_request, response) => {
    try {
        await addBookmark(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.post('/db/removebookmark', async (_request, response) => {
    try {
        await removeBookmark(_request.body);
        response.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        response.sendStatus(500);
    }
});
app.get('/bookmark', function (req, res) {//handles routing for the client
  res.sendFile("public/index.html",{ root: '.' });
});
const startServer = (port) => {
    app.listen(port, console.warn(`Listening on port ${port}`));
};

console.log('Completed API setup.');

export {
    startServer
}
import isRequestAuthorized from './helper/auth.js';
import express from 'express';
import cors from 'cors';
import queries  from './helper/sqlRequest.js';
import 'dotenv/config'
import bodyParser from 'body-parser';

const api = express();
api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
api.options('/getmodels', cors())
api.options('/getcomponents', cors())
api.options('/getrecipes', cors())
api.options('/addmodel', cors())
api.options('/deletemodel', cors())
api.options('/modifymodel', cors())
api.options('/addcomponent', cors())
api.options('/deletecomponent', cors())
api.options('/modifycomponent', cors())
api.options('/addrecipe', cors())
api.options('/deleterecipe', cors())
api.options('/modifyrecipe', cors())

const port = 8001;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

// API GET routes
api.get('/getmodels', cors(corsOptions), async (req, res) => {
    const token = req.query.token;
    const requestAuthorized = isRequestAuthorized(token);
    const data = await queries.getModels();

    if (requestAuthorized) {
        res.send(data);
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.get('/getrecipes', cors(corsOptions), async (req, res) => {
    const token = req.query.token;
    const requestAuthorized = isRequestAuthorized(token);
    const data = await queries.getRecipes();

    if (requestAuthorized) {
        res.send(data);
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.get('/getcomponents', cors(corsOptions), async (req, res) => {
    const token = req.query.token;
    const requestAuthorized = isRequestAuthorized(token);
    const data = await queries.getComponents();

    if (requestAuthorized) {
        res.send(data);
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});


// API POST routes
api.post('/addmodel', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.addModel(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/addcomponent', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.addComponent(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/addrecipe', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.addRecipe(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});

api.post('/modifymodel', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.modifyModel(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/modifyrecipe', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.modifyRecipe(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/modifycomponent', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    console.log(body);
    await queries.modifyComponent(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});

api.post('/deletemodel', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.deleteModel(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/deletecomponent', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.deleteComponent(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});
api.post('/deleterecipe', cors(corsOptions), async (req, res) => {
    const token = req.body.token;
    const body = req.body.data;
    const requestAuthorized = isRequestAuthorized(token);
    await queries.deleteRecipe(body);

    if (requestAuthorized) {
        res.send('done');
    } else {
        res.status(403).send("A token is required for authentication or token is invalid");
    }
});

// listened port from API
api.listen(port, () => {
    console.log(`API listening on port : ${port}`);
})
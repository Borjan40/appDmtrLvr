/* import app from './dist-server/entry-server.js' ;
import{ renderToString} from 'react-dom/server';
import express from 'express';
import {readFileSync} from 'fs'

const template = readFileSync('./dist/index.html').toString('utf-8');
const server = express();

console.log(template);

server.get('*', function(_req, resp){
    const html = renderToString(app);
    resp.end(html);
})

server.listen(8000); */

import app from './dist-server/entry-server.js';
import{ renderToString} from 'react-dom/server';
import express from 'express';

const server = express();

server.get('*', function(_req, resp){
    const html = renderToString(app);
    resp.end(html);
})

server.listen(8000);
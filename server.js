import app from './dist-server/entry-server.js' ;
import{ renderToString} from 'react-dom/server';
import express from 'express';
import {readFileSync} from 'fs'

const server = express();
const template = readFileSync('./dist/index.html').toString('utf-8');

server.get('*', function(_req, resp){
    const html = renderToString(app);
    const page = template.replace('<!--ssr-->',html)
    resp.end(page);
})

server.listen(8000);

console.log(template);

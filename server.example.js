import http from "http";
import { addNote } from "./notes.controller";
import fs from "fs/promises";
import path from "path";
const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
    // console.log('Server!')
    // // console.log('Request object: ', req)
    // console.log('Request method: ', req.method)
    // console.log('Request url: ', req.url)
    // res.end('Hello from server!!!')
    if (req.method === 'GET') {
        if (req.url === '/') {
            const content = await getContent()
            // res.setHeader('Content-Type', 'text/html')
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(content)
        }
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-type': 'text/plain; charset=utf-8'
        })
        req.on('data', data => {
            // console.log(data)
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const title = body.toString().split('=')[1].replaceAll('+',' ')
            // console.log(title)
            addNote(title)
            res.end(`Title = ${title}`)
        })
    }
})

async function getContent() {
    return await fs.readFile(path.join(basePath, 'index_back.html'), {encoding: 'utf-8'})
}
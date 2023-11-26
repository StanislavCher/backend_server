// require('./module')
//
// const person = {
//     name: 'Vladislav',
//     age: 25
// }
//
// const getName = (p) => {
//     return p.name
// }
//
// console.log(getName(person))
//
// console.log(__filename)
// console.log(__dirname)
//
// module.exports = {
//
// }
//
// console.log(process.argv[2])
//
// const yargs = require('yargs')
// const pkg = require('./package.json')
// const { addNote, removeNote, printNotes} = require('./notes.controller')
// const { addNote, getNotes, removeNote, updateNote, printNotes} = require("./notes.controller");
//
// yargs.version(pkg.version)
//
// yargs.command({
//     command: 'add',
//     describe: 'Add new note to list',
//     builder: {
//         title: {
//             type: 'string',
//             describe: 'Note title',
//             demandOption: true
//         }
//     },
//     async handler({ title }) {
//         // console.log('Add command:', title)
//         await addNote(title)
//     }
// })
//
// yargs.command({
//     command: 'list',
//     describe: 'Print all notes',
//     async handler() {
//         // console.log('List command')
//         // console.log(getNotes())
//         // const notes = await printNotes()
//         // console.log(notes)
//         await printNotes()
//     }
// })
//
// yargs.command({
//     command: 'remove',
//     describe: 'Remove note by id',
//     builder: {
//         id: {
//             type: 'string',
//             describe: 'Note uniq id',
//             demandOption: true
//         }
//     },
//     async handler({id}) {
//         // console.log('List command')
//         // console.log(getNotes())
//         // const notes = await printNotes()
//         //console.log(id)
//         await removeNote(id)
//     }
// })
//
// yargs.command({
//     command: 'edit',
//     describe: 'Edit note by id',
//     builder: {
//         id: {
//             type: 'string',
//             describe: 'Note id',
//             demandOption: true
//         },
//         title: {
//             type: 'string',
//             describe: 'Note title',
//             demandOption: true
//         }
//     },
//     async handler({ id, title }) {
//         // console.log('Add command:', title)
//         await updateNote(id, title)
//     }
// })
//
// yargs.parse()

// const http = require('http')
const chalk = require('chalk')
// const fs = require('fs/promises')
const path = require('path')
const { addNote, getNotes, removeNote, updateNote} = require("./notes.controller");
// const basePath = path.join(__dirname, 'pages')
const port = 3000
const express = require('express')

const app = express()
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.get('/',async (req, res) => {
    // res.sendFile(path.join(basePath, 'index_back.html'))
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        // notes: [],
        created: false
    })
})
app.post('/',async (req, res) => {
    // console.log(req.body)
    await addNote(req.body.title)
    // res.sendFile(path.join(basePath, 'index_back.html'))
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})
app.delete('/:id', async (req, res) => {
    // console.log(req.params.id)
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})
app.put('/', async (req, res) => {
    // console.log(req.query)
    // console.log(req)
    // console.log(req.body)
    // await updateNote(req.query.id, req.query.title)
    await updateNote(req.body.id, req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})
app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})

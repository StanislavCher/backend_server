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

const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, removeNote, printNotes} = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    async handler({ title }) {
        // console.log('Add command:', title)
        await addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        // console.log('List command')
        // console.log(getNotes())
        // const notes = await printNotes()
        // console.log(notes)
        await printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    async handler({id}) {
        // console.log('List command')
        // console.log(getNotes())
        // const notes = await printNotes()
        //console.log(id)
        await removeNote(id)
    }
})

yargs.parse()

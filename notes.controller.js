const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
// console.log(notesPath)
async function addNote(title) {
    // const notes = require('./db.json')
    // console.log(title)
    // const buffer = await fs.readFile(notesPath)
    // const notes = Buffer.from(buffer).toString('utf-8')
    // const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    // console.log(Array.isArray(notes))
    // console.log(typeof (notes))
    // console.log(typeof JSON.parse(notes))
    // console.log(Array.isArray(JSON.parse(notes)))

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }
    // console.log(note)
    notes.push(note)

    await saveNotes(notes)
    console.log(chalk.bgGreen('Note was added!'))
}
// addNote('Test!')
async function getNotes() {
    // return require('./db.json')
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function removeNote(id) {
    // return require('./db.json')
    const notes = await getNotes()

    //console.log(notes)
    // console.log(id)

    const newNotes = notes.filter((note) => {
        // console.log(note.id, id, note.id.toString() !== id.toString())
        return note.id !== id
    })

    // console.log(newNotes)

    await saveNotes(newNotes)
    console.log(chalk.red(`Note with id ${id} was removed!`))
}
async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach((note) => {
        console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
    })
}
async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
    addNote, removeNote, printNotes
}

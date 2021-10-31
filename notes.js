const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNotes = (title) => {
    console.log(title)
}
const listNotes = () => {
    const loadList = loadNotes()
    loadList.forEach((note) => {
        console.log(note.title)
    })
}
const readNote = (title) => {
    const notes = loadNotes()
    const allNotes = notes.find((note) => {
        return note.title == title
    })
    if (allNotes) {
        console.log(chalk.green.inverse(allNotes.title))
    } else {
        console.log(chalk.red.inverse('error'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}
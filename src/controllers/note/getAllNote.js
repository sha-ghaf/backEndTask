const Note = require('../../helpers/schema/noteSchema.js')

const getAllNotes = async( req, res ) => {
    try{
        const notes = await Note.find({})
        res.status(200).send(notes)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = getAllNotes
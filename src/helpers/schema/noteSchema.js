const mongoose = require ('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        text:{
            type: String,
            required: true,
            trim: true
        },
        completed:{
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 1
})

module.exports = mongoose.model('Note', noteSchema)
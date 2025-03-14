// model pour la bdd
import Joi from "joi";
import mongoose from "mongoose";

const hoursandminutes = () => {
    const time = new Date();
    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());
    return `${hours}:${minutes}`;
}

const chatSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    hour : {
        type: String,
        default: hoursandminutes
    },
},
{ timestamps: true }
)

const chat = mongoose.model('chat', chatSchema)

const chatValidation = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'string.empty': 'Le nom est obligatoire'
    }),
    message: Joi.string()
    .required()
    .messages({
        'string.empty': 'Le message ne peut pas être vide'
    })
})

export { chat, chatValidation }

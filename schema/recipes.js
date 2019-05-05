const mongoose = require('mongoose')

const RecepieSchema = new mongoose.Schema({
 // id: String,
    recepieName: String,
    recepieAbout: String,
    recepieIngredients: Array,
    recepieProcess: Array,
    recepieImgPath: { type: String, default: "/assets/default.jpg" }
})

// Its mapping the data into the db & mapping back to JS.
var Recepie = mongoose.model('Recepie', RecepieSchema)

module.exports = Recepie
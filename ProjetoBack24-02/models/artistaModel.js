const mongoose = require('mongoose');

const artistaSchema = new mongoose.Schema({
    nome: { type: String, required:[true,'Nome é Obrigatório'] },
    nacionalidade: { type: String, required:[true,'nacionalidade é Obrigatório']},
    bio: { type: String, required:true},
    estiloPrincipal: { 
        type: String, 
        required: [true, 'O estilo principal (ex: Cubismo, Realismo) é obrigatório'] 
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Artista', artistaSchema);
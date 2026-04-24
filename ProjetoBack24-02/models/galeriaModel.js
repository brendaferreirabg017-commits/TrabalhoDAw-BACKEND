const mongoose = require('mongoose');

const galeriaSchema = new mongoose.Schema({
    nome: { type: String, required:[true,'Nome é Obrigatório'] },
    endereço: { type: String, required:[true,'nacionalidade é Obrigatório']},
    capacidade: { type: Number, required:true},
    estiloPrincipal: { 
        type: String, 
        required: [true, 'O estilo principal (ex: Cubismo, Realismo) é obrigatório'] 
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Galeria', galeriaSchema);
const mongoose = require('mongoose');

const obraSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'A técnica da obra é Obriagatório: ']
    },
    ano: {
        type: Number,
        required: [true, 'O ano da obra é Obriagatório: ']
    },
    tecnica: {
        type: String,
        required: [true, 'A técnica utilizada é Obriagatória: ']
    },
    artista: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Artista', 
        required: [true, 'Toda obra precisa de um autor (Artista)']
    },
    galeria: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Galeria',
        required: [true, 'Toda obra precisa estar em uma Galeria']
    }
});

const Obra = mongoose.model('Obra', obraSchema);

module.exports = Obra;

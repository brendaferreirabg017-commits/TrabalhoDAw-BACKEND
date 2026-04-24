const Obra = require('../models/obraModel');
const Artista = require('../models/artistaModel');
const Galeria= require('../models/galeriaModel');

const createObra = async (req, res) => {
    const { titulo, ano, tecnica,artista,galeria } = req.body;

    if (!titulo || !tecnica || !ano || !artista || !galeria ) {
        return res.status(400).json({ error: 'Título, tecnica e ano são campos obrigatórios' });
    }
    try {
        const artistaExists = await Artista.findById(artista);
        if (!artistaExists) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }
        const galeriaExists=await Galeria.findById(galeria);
        if (!galeriaExists) {
            return res.status(404).json({ error: 'Galeria não encontrada' });
        }
        const novaObra = new Obra({
            titulo,
            ano,
            tecnica,
            artista,
            galeria
        });
        await novaObra.save();

        res.status(201).json({ msg: 'Obra adicionada com sucesso', obra: novaObra });
        
        
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Obra' });
    }

}

const listObra = async (req, res) => {
    try {
        const obra = await Obra.find().populate('artista', 'nome nacionalidade bio estiloPrincipal')
         .populate('galeria', 'nome endereço capacidade estiloPrincipal');
        res.status(200).json(obra);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar Obras' });
    }
}

const editObra = async (req, res) => {
    const { id } = req.params;
    const { titulo, ano, tecnica,artista,galeria } = req.body;
    try {
        // Usar findByIdAndUpdate é mais direto para edições
        const updatedObra = await Obra.findByIdAndUpdate(
            id, 
            { titulo, ano, tecnica, artista, galeria }, 
            { new: true, runValidators: true } // Retorna o objeto novo e valida o schema
        );

        if (!updatedObra) {
            return res.status(404).json({ error: 'Obra não encontrada' });
        }

        res.status(200).json({ msg: 'Obra atualizada com sucesso', obra: updatedObra });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar obra' });
    }
};

       const deleteObra = async (req, res) => {
       const { id } = req.params;
     try {
        const obraDeletada = await Obra.findByIdAndDelete(id);
        
        if (!obraDeletada) {
            return res.status(404).json({ error: 'Obra não encontrada' });
        }

        res.status(200).json({ msg: 'Obra deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar obra' });
    }
};

module.exports = { createObra, listObra, editObra, deleteObra };
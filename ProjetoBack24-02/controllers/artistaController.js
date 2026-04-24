const Artista = require('../models/artistaModel');

const criarArtista = async (req, res) => {
    const { nome, nacionalidade, bio, estiloPrincipal } = req.body;

    if(!nome || !nacionalidade || !bio || !estiloPrincipal){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }
    try{
        const existeArtista = await Artista.findOne({ nome });
        if(existeArtista){
            return res.status(400).json({ msg: "Nome já existe no sistema"});
        }
        const novoArtista = await Artista.create({ nome, nacionalidade, bio, estiloPrincipal })
        const { _id, nome: nomeArtista, nacionalidade: nacionalidadeArtista, bio: bioArtista, estiloPrincipal: estiloPrincipalArtista } = novoArtista;
        res.status(201).json({ msg: "Artista adicionado com sucesso", artista: { id: _id, nome: nomeArtista, nacionalidade: nacionalidadeArtista, bio: bioArtista, estiloPrincipal: estiloPrincipalArtista } });
    } catch (error){
        res.status(500).json({ msg: "Erro ao criar novo artista: ", error: error.message });
    }
}

const listarArtista = async(req, res) =>{
    try {
        const artistas = await Artista.find({});
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ msg:"Erro ao listar artistas: ", error: error.message })
    }
}

const editarArtista = async (req, res) => {
    const { id } = req.params;
    const { nome, nacionalidade, bio, estiloPrincipal } = req.body;

    try {
        const artista = await Artista.findById(id);

        if(!artista){
            return res.status(404).json({msg: "Artista não existe no banco"});
        }

        if(nome) artista.nome = nome;
        if(nacionalidade) artista.nacionalidade = nacionalidade;
        if(bio) artista.bio = bio;
        if(estiloPrincipal) artista.estiloPrincipal = estiloPrincipal;

        await artista.save()

        res.json({
            msg: "Artista atualizado com sucesso",
            artista: {
                id: artista._id,
                nome: artista.nome,
                nacionalidade: artista.nacionalidade,
                bio: artista.bio,
                estiloPrincipal: artista.estiloPrincipal
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao atualizar artista",
            error: error.message
        });
    }
};

const deletarArtista = async (req, res) => {
    const { id } = req.params;

    try {
        const artista = await Artista.findByIdAndDelete(id);

        if(!artista){
            return res.status(404).json({msg: "Artista não encontrado"});
        }

        res.json({ msg: "Artista deletado com sucesso"})
    } catch (error) {
        res.status(500).json({
            msg:"Erro ao deletar artista",
            error: error.message
        });
    }
};

module.exports = { criarArtista, listarArtista, editarArtista, deletarArtista };
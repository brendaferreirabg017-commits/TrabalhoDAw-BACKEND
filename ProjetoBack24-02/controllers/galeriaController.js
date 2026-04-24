const Galeria = require('../models/galeriaModel');

const criarGaleria = async (req, res) => {
    const { nome, endereço, capacidade, estiloPrincipal } = req.body;

    if(!nome || !endereço || !capacidade || !estiloPrincipal){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }
    try{
        const existeGaleria = await Galeria.findOne({ nome });
        if(existeGaleria){
            return res.status(400).json({ msg: "Nome de galeria já existe no sistema"});
        }
        const novaGaleria = await Galeria.create({ nome, endereço, capacidade, estiloPrincipal })
        const { _id, nome: nomeGaleria, endereço: endereçoGaleria, capacidade: capacidadeGaleria, estiloPrincipal: estiloPrincipalGaleria } = novaGaleria;
        res.status(201).json({ msg: "Galeria adicionada com sucesso", galeria: { id: _id, nome: nomeGaleria, endereço: endereçoGaleria, capacidade: capacidadeGaleria, estiloPrincipal: estiloPrincipalGaleria } });
    } catch (error){
        res.status(500).json({ msg: "Erro ao criar nova galeria: ", error: error.message });
    }
}

const listarGaleria = async(req, res) =>{
    try {
        const galerias = await Galeria.find({});
        res.json(galerias);
    } catch (error) {
        res.status(500).json({ msg:"Erro ao listar galerias: ", error: error.message })
    }
}

const editarGaleria = async (req, res) => {
    const { id } = req.params;
    const { nome, endereço, capacidade, estiloPrincipal } = req.body;

    try {
        const galeria = await Galeria.findById(id);

        if(!galeria){
            return res.status(404).json({msg: "Galeria não existe no banco"});
        }

        if(nome) galeria.nome = nome;
        if(endereço) galeria.endereço = endereço;
        if(capacidade) galeria.capacidade = capacidade;
        if(estiloPrincipal) galeria.estiloPrincipal = estiloPrincipal;

        await galeria.save()

        res.json({
            msg: "Galeria atualizada com sucesso",
            galeria: {
                id: galeria._id,
                nome: galeria.nome,
                endereço: galeria.endereço,
                capacidade: galeria.capacidade,
                estiloPrincipal: galeria.estiloPrincipal
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao atualizar galeria",
            error: error.message
        });
    }
};

const deletarGaleria = async (req, res) => {
    const { id } = req.params;

    try {
        const galeria = await Galeria.findByIdAndDelete(id);

        if(!galeria){
            return res.status(404).json({msg: "Galeria não encontrada"});
        }

        res.json({ msg: "Galeria deletada com sucesso"})
    } catch (error) {
        res.status(500).json({
            msg:"Erro ao deletar galeria",
            error: error.message
        });
    }
};

module.exports = { criarGaleria, listarGaleria, editarGaleria, deletarGaleria };

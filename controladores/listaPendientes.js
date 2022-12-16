const { Router } = require('express');
const ListaPendientes = require('../modelos/ListaPendientes');

const router = Router();


router.get('/', async (req, res) => {
    try {
        const listaPendientess = await ListaPendientes.find();
        if (!listaPendientess) throw new Error('No hay nada');
        const sorted = listaPendientess.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.post('/', async (req, res) => {
    const newListaPendientes = new ListaPendientes(req.body)

    try {
        const listaPendientes = await newListaPendientes.save();
        if (!listaPendientes) throw new Error('Algo salió mal');
        res.status(200).json(listaPendientes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await ListaPendientes.findByIdAndUpdate(id, req.body);
        if(!response) throw Error('Algo salió mal ');
        const updated = { ...response._doc, ...req.body};
        res.status(200).json(updated)

        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await ListaPendientes.findByIdAndDelete(id);
        if(!removed) throw Error('Algo salió mal');
        res.status(200).json(removed)

    } catch(error){
        res.status(500).json({ message: error.message})
    }
})

module.exports = router;
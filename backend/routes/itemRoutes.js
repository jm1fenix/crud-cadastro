const express = require('express');
const Item = require('../models/item'); // Importa o modelo de Item

const router = express.Router();

// Rota para criar um novo item (POST)
router.post('/items', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newItem = new Item({ name, description });
    await newItem.save(); // Salva o item no banco de dados
    res.status(201).json(newItem); // Retorna o item criado
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar o item', error: err });
  }
});

// Rota para listar todos os itens (GET)
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); // Busca todos os itens no banco
    res.status(200).json(items); // Retorna os itens encontrados
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar os itens', error: err });
  }
});

// Rota para atualizar um item (PUT)
router.put('/items/:id', async (req, res) => {
  const { id } = req.params; // Pega o id da URL
  const { name, description } = req.body; // Pega os dados do corpo da requisição

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json(updatedItem); // Retorna o item atualizado
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar o item', error: err });
  }
});

// Rota para excluir um item (DELETE)
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params; // Pega o id da URL

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json({ message: 'Item excluído com sucesso' }); // Retorna uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir o item', error: err });
  }
});

module.exports = router;

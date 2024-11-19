const mongoose = require('mongoose');

// Definindo o esquema do item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Criando o modelo a partir do esquema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item; // Exportando o modelo para usá-lo nas rotas

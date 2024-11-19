const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // Para que o Express entenda o corpo das requisições em JSON
app.use(cors()); // Para permitir requisições do frontend em outra porta/dominio

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/crudapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB!');
}).catch((err) => {
  console.log('Erro ao conectar ao MongoDB:', err);
});

// Definir as rotas
const itemRoutes = require('./routes/itemRoutes');
app.use('/api', itemRoutes); // Definindo o prefixo para as rotas de item (ex: /api/items)

// Configurando o servidor para escutar na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

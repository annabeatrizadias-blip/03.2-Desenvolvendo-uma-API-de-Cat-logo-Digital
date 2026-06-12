const express = require('express');
const livroRoutes = require('./src/routes/livroRoutes');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(livroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`Disponível em: http://localhost:${PORT}`);
});
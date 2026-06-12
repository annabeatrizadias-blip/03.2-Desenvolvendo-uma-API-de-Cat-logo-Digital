const livrosDb = require('../database/livroDb.js');

const listar = (req, res) => {
  res.status(200).json(livrosDb);
};

const buscar = (req, res) => {
  const { id } = req.params;
  const livro = livrosDb.find(l => l.id === parseInt(id));

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado." });
  }
  res.status(200).json(livro);
};

const cadastrar = (req, res) => {
  const { titulo, autor, genero } = req.body;

  if (!titulo || !autor || !genero) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const novoId = livrosDb.length > 0 ? Math.max(...livrosDb.map(l => l.id)) + 1 : 1;
  const novoLivro = { id: novoId, titulo, autor, genero };
  livrosDb.push(novoLivro);

  res.status(201).json({ mensagem: "Livro cadastrado com sucesso!", livro: novoLivro });
};

const atualizar = (req, res) => {
  const { id } = req.params;
  const { titulo, autor, genero } = req.body;

  const livroIndex = livrosDb.findIndex(l => l.id === parseInt(id));

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado para atualização." });
  }

  if (titulo) livrosDb[livroIndex].titulo = titulo;
  if (autor) livrosDb[livroIndex].autor = autor;
  if (genero) livrosDb[livroIndex].genero = genero;

  res.status(200).json({ mensagem: "Livro atualizado com sucesso!", livro: livrosDb[livroIndex] });
};

const remover = (req, res) => {
  const { id } = req.params;
  const livroIndex = livrosDb.findIndex(l => l.id === parseInt(id));

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado para remoção." });
  }

  const livroRemovido = livrosDb.splice(livroIndex, 1);
  res.status(200).json({ mensagem: "Livro removido com sucesso!", livro: livroRemovido[0] });
};

module.exports = {
  listar,
  buscar,
  cadastrar,
  atualizar,
  remover
};
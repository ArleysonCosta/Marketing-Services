const express = require('express');
const bodyParser = require('body-parser');
const Arquivo = require('../model/arquivo');

const app = express();
app.use(bodyParser.json());

app.post('/mensagens',(req,res) => {
    const {numero, mensagem } = req.body;
    const data = {numero, mensagem, horario : new Date().toISOString()};
    
    const arquivoInstace = new Arquivo();
    arquivoInstace.salvar('mensagens.txt',data);
    res.send("mensagem recebida com sucesso");
});

app.get('/mensagens', (req,res) => {
    const arquivoInstace = new Arquivo();
    const data = arquivoInstace.ler('mensagens.txt');

    const messages = [];
    data.forEach((message) => {
        if (message !== '') {
          messages.push(JSON.parse(message));
        }
      });
    res.send(messages);
}); 
PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Rota Inicial (Raiz)
app.get('/', (req, res) => {
    
    const tegami = 'tegami';
    res.render('init',{ tegami: tegami, banco: testeBancoInProduct });
});

// Rota para carregar paginas no diretorio paginas
app.get('/carta', async (req, res) => {
    const { titulo } = req.query;

    const diretorioDeArquivos = path.join(__dirname, 'paginas');
    const arquivo = path.join(diretorioDeArquivos, `${titulo}.txt`);
    const conteudo = fs.readFileSync(arquivo, 'utf8')

    try {
        res.render('carta', { titulo: titulo, texto: conteudo });
    } catch (err) {
        console.log('Erro ao buscar carta:', err);
        res.status(500).json({ mensagem: 'Erro no docs (Carregamento de Arquivos)' });
    }
});

// Exportar para o Vercel
module.exports = app;

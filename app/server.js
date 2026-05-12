// Importa Express
const express = require('express');

// Importa conexão com banco
const pool = require('./db');

// Inicializa aplicação
const app = express();

// Habilita JSON
app.use(express.json());

// Define pasta pública
app.use(express.static('public'));

// Função de conexão com banco
async function conectarBanco() {

  let conectado = false;

  // Tenta conectar até conseguir
  while (!conectado) {

    try {

      // Cria tabela se não existir
      await pool.query(`
        CREATE TABLE IF NOT EXISTS nomes (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100)
        )
      `);

      conectado = true;

      console.log('Banco conectado com sucesso');

    } catch (error) {

      // Aguarda banco iniciar
      console.log('Aguardando banco iniciar...');

      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

// Executa conexão
conectarBanco();


// Lista nomes
app.get('/nomes', async (req, res) => {

  const result = await pool.query(
    'SELECT * FROM nomes ORDER BY id'
  );

  res.json(result.rows);
});


// Cadastra nome
app.post('/nomes', async (req, res) => {

  const { nome } = req.body;

  await pool.query(
    'INSERT INTO nomes (nome) VALUES ($1)',
    [nome]
  );

  res.sendStatus(201);
});


// Remove nome
app.delete('/nomes/:id', async (req, res) => {

  const { id } = req.params;

  await pool.query(
    'DELETE FROM nomes WHERE id = $1',
    [id]
  );

  res.sendStatus(200);
});


// Inicializa servidor
app.listen(3000, () => {

  console.log('Servidor rodando na porta 3000');
});
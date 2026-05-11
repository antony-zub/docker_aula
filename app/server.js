const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());
app.use(express.static('public'));

async function conectarBanco() {

  let conectado = false;

  while (!conectado) {

    try {

      await pool.query(`
        CREATE TABLE IF NOT EXISTS nomes (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100)
        )
      `);

      conectado = true;

      console.log('Banco conectado com sucesso');

    } catch (error) {

      console.log('Aguardando banco iniciar...');

      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

conectarBanco();

app.get('/nomes', async (req, res) => {

  const result = await pool.query(
    'SELECT * FROM nomes ORDER BY id'
  );

  res.json(result.rows);
});

app.post('/nomes', async (req, res) => {

  const { nome } = req.body;

  await pool.query(
    'INSERT INTO nomes (nome) VALUES ($1)',
    [nome]
  );

  res.sendStatus(201);
});

app.delete('/nomes/:id', async (req, res) => {

  const { id } = req.params;

  await pool.query(
    'DELETE FROM nomes WHERE id = $1',
    [id]
  );

  res.sendStatus(200);
});

app.listen(3000, () => {

  console.log('Servidor rodando na porta 3000');
});
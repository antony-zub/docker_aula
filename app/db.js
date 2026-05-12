// Importa biblioteca PostgreSQL
const { Pool } = require('pg');

// Cria conexão com banco
const pool = new Pool({

  // Nome do serviço no Docker Compose
  host: 'db',

  // Usuário do banco
  user: 'postgres',

  // Senha do banco
  password: 'postgres',

  // Nome do banco
  database: 'cadastro',

  // Porta PostgreSQL
  port: 5432
});

// Exporta conexão
module.exports = pool;
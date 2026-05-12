# Imagem base Node.js
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json
COPY package.json .

# Instala dependências
RUN npm install

# Copia arquivos da aplicação
COPY . .

# Porta utilizada pela aplicação
EXPOSE 3000

# Comando inicial do container
CMD ["npm", "start"]
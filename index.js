const express = require("express");
const app = express();
const port = 3000; // Const para armanezar a porta do servidor
const path = require("path");

// var pokemons = [];
var message = "";

const pokedex = [
  {
    numero: 001, 
    nome: 'Bulbasaur',
    tipo: 'Grass',
    imagem: './img/Bulbasaur.png',
    descricao: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
    altura: 0.7,
    peso: 6.9,
    categoria: 'seed',
    habilidade: 'overgrow'
  },
  {
    numero: 004, 
    nome: 'Charmander',
    tipo: 'Fire',
    imagem: './img/Charmander.png',
    descricao: 'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.',
    altura: 0.6,
    peso: 8.5,
    categoria: 'lizard',
    habilidade: 'Blaze'
  },
  {
    numero: 007, 
    nome: 'Squirtle',
    tipo: 'Water',
    imagem: './img/Squirtle.png',
    descricao: 'When it retracts its long neck into its shell, it squirts out water with vigorous force.',
    altura: 0.5,
    peso: 9.0,
    categoria: 'tiny turtle',
    habilidade: 'torrent'
  }];

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Substituição de function por arrow function
app.get("/", (req, res) => {

  setTimeout(() => {
    message = "";
  },5000);
  
  res.render("index", {
    pokedex: pokedex,
    message,
  });
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro", {
    message, 
    }); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/detalhes/:poke", (req, res) => {
  let detalhe = req.params.poke;
  let pokedetalhe = pokedex.find(x => x.numero == detalhe)
  res.render("detalhes", {
    pokedex: pokedex,
    pokedetalhe,

  }); 
});


app.post("/new", (req, res) => {
  const {numero, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body
  let objeto = {numero: numero, nome: nome, tipo: tipo, imagem: imagem, descriçao: descricao, altura: altura, peso: peso, categoria: categoria, habilidade: habilidade};
  message = `O pokemon ${nome} foi cadastrado com sucesso!`
  pokedex.push(objeto)
  res.redirect("/")
});



// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
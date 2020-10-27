const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url , techs } = request.body;
  const repositorie = {
     id: uuid(), 
     title, 
     url, 
     techs,
     likes: 0 
  }
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url , techs } = request.body;
  const indexRepositorie = repositories.findIndex( (item) => item.id == id );
  if(indexRepositorie >= 0 ){
    repositories[indexRepositorie].techs = techs;
    repositories[indexRepositorie].title = title;
    repositories[indexRepositorie].url = url;
    return response.status(200).json(repositories[indexRepositorie]);
  }else{
    return response.status(400).send();
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepositorie = repositories.findIndex( (item) => item.id == id );
  if(indexRepositorie >= 0 ){
    repositories.splice(indexRepositorie, 1);
    return response.status(204).send();
  }else{
    return response.status(400).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepositorie = repositories.findIndex( (item) => item.id == id );
  if( indexRepositorie >= 0 ){
    repositories[indexRepositorie].likes++;
    return response.json(repositories[indexRepositorie]);
  }else{
    return response.status(400).send();
  }
});

module.exports = app;

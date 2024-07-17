const fs = require('fs');
const path = require('path');

const filePath = path.resolve('db.json');

function readData() {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  const data = readData();

  if (req.method === 'GET') {
    res.status(200).json(data.tarefas);
  } else if (req.method === 'POST') {
    const newTask = req.body;
    data.tarefas.push(newTask);
    writeData(data);
    res.status(201).json(newTask);
  } else {
    res.status(405).end();
  }
};
const fs = require('fs');
const path = require('path');

const filePath = path.resolve('db.json');

function readData() {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  const { id } = req.query;
  const data = readData();

  if (req.method === 'DELETE') {
    data.tarefas = data.tarefas.filter(tarefa => tarefa.id !== parseFloat(id));
    writeData(data);
    res.status(204).end();
  } else if (req.method === 'PUT') {
    const updatedTask = req.body;
    data.tarefas = data.tarefas.map(tarefa => tarefa.id === parseFloat(id) ? updatedTask : tarefa);
    writeData(data);
    res.status(200).json(updatedTask);
  } else {
    res.status(405).end();
  }
};

'use strict';

const express = require('express');

const { itemCollection } = require('../models/index.model');

const router = express.Router();

// RESTful route declarations
router.get('/list', getItems);
router.get('/list/:id', getItem);
router.post('/list', createItem);
router.put('/list/:id', updateItem);
router.delete('/list/:id', deleteItem);

// route handlers
async function getItems(req, res) {
  let allTask = await itemCollection.read(null);
  res.status(200).json(allTask);
}

async function getItem(req, res) {
  let id = parseInt(req.params.id);
  let task = await itemCollection.read(id);
  res.status(200).json(task);
}

async function createItem(req, res) {
  let obj = req.body;
  let newTask = await itemCollection.create(obj);
  res.status(200).json(newTask);
}

async function updateItem(req, res) {
  let obj = req.body;
  let id = parseInt(req.params.id);
  let updatedTask = await itemCollection.update(id, obj);
  res.status(200).json(updatedTask);
}

async function deleteItem(req, res) {
  let id = parseInt(req.params.id);
  let deletedTask = await itemCollection.delete(id);
  res.status(204).json(deletedTask);
}

module.exports = router;
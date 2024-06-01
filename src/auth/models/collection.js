'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(jsonObj) {
    try {
      let record = await this.model.create(jsonObj);
      return record;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`);
      return e;
    }
  }

  async read(idOrUsername, options = {}) {
    let records = null;
    try {
      if (!idOrUsername) {
        throw new Error('idOrUsername is required');
      }
  
      const queryOptions = { ...options };
      
      if (typeof idOrUsername === 'number') {
        queryOptions.where = { id: idOrUsername };
      } else if (typeof idOrUsername === 'string') {
        queryOptions.where = { username: idOrUsername };
      } else {
        throw new Error('idOrUsername must be a number or a string');
      }
  
      records = await this.model.findOne(queryOptions);
      return records;
    } catch (e) {
      console.error(`Error when reading data for model: ${this.model.name}`, e);
      return null;
    }
  }
  

  async update(id, jsonObj) {
    try {
      if (!id)
        throw new Error(`No ID provided for the model: ${this.model.name}`);
      let record = await this.model.findOne({ where: { id } });
      let updatedRecord = await record.update(jsonObj);
      return updatedRecord;
    } catch (e) {
      console.error(`error when updating model: ${this.model.name}`);
      return e;
    }
  }

  async delete(id) {
    try {
      if (!id)
        throw new Error(`No ID provided for the model: ${this.model.name}`);
      let deletedRecord = await this.model.destroy({ where: { id } });
      return deletedRecord;
    } catch (e) {
      console.error(`error when deleting model: ${this.model.name}`);
      return e;
    }
  }
}

module.exports = Collection;

// models/Company.js
const { getCustomerDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const db = getCustomerDB();

const Company = {
  findAll: async () => {
    try {
      return await db.collection('companies').find({}).toArray();
    } catch (error) {
      throw new Error('Error fetching companies: ' + error.message);
    }
  },

  findById: async (id) => {
    try {
      return await db.collection('companies').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error('Error fetching company: ' + error.message);
    }
  },

  createCompany: async (companyData) => {
    try {
      return await db.collection('companies').insertOne(companyData);
    } catch (error) {
      throw new Error('Error creating company: ' + error.message);
    }
  },

  updateCompany: async (id, companyData) => {
    try {
      return await db.collection('companies').updateOne(
        { _id: new ObjectId(id) },
        { $set: companyData }
      );
    } catch (error) {
      throw new Error('Error updating company: ' + error.message);
    }
  },

  deleteCompany: async (id) => {
    try {
      return await db.collection('companies').deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error('Error deleting company: ' + error.message);
    }
  },
};

module.exports = Company;

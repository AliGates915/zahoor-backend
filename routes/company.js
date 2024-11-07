// routes/company.js
const express = require('express');
const Company = require('../models/Company');

const router = express.Router();

// Get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({ status: true, companies });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error fetching companies' });
  }
});

// Get company by ID
router.get('/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.json({ status: false, message: 'Company not found' });
    }
    res.json({ status: true, company });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error fetching company' });
  }
});

// Create a new company
router.post('/companies', async (req, res) => {
  const companyData = req.body; // Extract company data from request body
  try {
    await Company.createCompany(companyData);
    res.json({ status: true, message: 'Company created successfully' });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error creating company' });
  }
});

// Update a company
router.put('/companies/:id', async (req, res) => {
  const { id } = req.params;
  const companyData = req.body; // Extract updated company data from request body
  try {
    const result = await Company.updateCompany(id, companyData);
    if (result.modifiedCount === 0) {
      return res.json({ status: false, message: 'Company not found or no changes made' });
    }
    res.json({ status: true, message: 'Company updated successfully' });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error updating company' });
  }
});

// Delete a company
router.delete('/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Company.deleteCompany(id);
    if (result.deletedCount === 0) {
      return res.json({ status: false, message: 'Company not found' });
    }
    res.json({ status: true, message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error deleting company' });
  }
});

module.exports = { CompanyRouter: router };

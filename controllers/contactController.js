const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient
const client=new MongoClient("mongodb://0.0.0.0:27017/muthu");
const db=client.db("muthu");
var coll=db.collection("user");
const { ObjectId } = require('mongodb');

//@desc Get contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get all contacts" });
});
const getData = asyncHandler(async (req, res) => {
  try {
    console.log("controller----->");

    // Retrieve all documents from the collection
    const data = await coll.find({}).toArray();

    // Send the retrieved data as the response
    res.status(200).send(data);
  } catch (err) {
    console.error("Failed to retrieve data", err);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});
const getPost = asyncHandler(async (req, res) => {
  try {
    console.log("controller----->");

    // Destructure the incoming data from the request body
    const { name, email, phone } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    // Insert the document into the collection
    await coll.insertOne({
      name,
      email,
      phone,
    });

    // Retrieve all documents in the collection
    const data = await coll.findOne({name});

    // Send the retrieved data as the response
    res.status(200).send(data);
  } catch (err) {
    console.error("Failed to insert or retrieve documents", err);
    res.status(500).json({ error: "Failed to insert or retrieve documents" });
  }
});

const getDataById = asyncHandler(async (req, res) => {
  try {
    console.log("Fetching data by ID----->");

    // Extract the ID from the request parameters
    const { id } = req.params;

    // Find the document by its ID
    const data = await coll.findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send the retrieved data as the response
    res.status(200).send(data);
  } catch (err) {
    console.error("Failed to retrieve data by ID", err);
    res.status(500).json({ error: "Failed to retrieve data by ID" });
  }
});

const updateDataById = asyncHandler(async (req, res) => {
  try {
    console.log("Updating data by ID----->");

    // Extract the ID from the request parameters
    const { id } = req.params;

    // Destructure the incoming data from the request body
    const { name, email, phone } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    // Update the document in the collection by its ID
    const result = await coll.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, phone } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Document not found or nothing was updated" });
    }

    // Send a success response
    res.status(200).json({ message: "Document updated successfully" });
  } catch (err) {
    console.error("Failed to update document", err);
    res.status(500).json({ error: "Failed to update document" });
  }
});

const deleteDataById = asyncHandler(async (req, res) => {
  try {
    console.log("Deleting data by ID----->");

    // Extract the ID from the request parameters
    const { id } = req.params;

    // Delete the document from the collection by its ID
    const result = await coll.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("Failed to delete document", err);
    res.status(500).json({ error: "Failed to delete document" });
  }
});


//@desc create contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All fileds are required !");
  }
  res.status(201).json({ message: "create new  contact" });
});

//@desc get contact
//@route GET /api/contact/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `get   contact for ${req.params.id}` });
});

//@desc update contact
//@route PUT /api/contact/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `update  contact for ${req.params.id}` });
});

//@desc delete contact
//@route DELETE /api/contact/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete  contact for ${req.params.id}` });
});


module.exports = {
  getContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  getContacts,getData,getPost, getDataById,updateDataById,deleteDataById
};

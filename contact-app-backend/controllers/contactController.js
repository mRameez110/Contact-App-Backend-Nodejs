const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
//route GET /api/contacts
//Access publicaly

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ message: contacts });
});

// Get all contacts
//route POST /api/contacts/:id
//Access publicaly

const createContact = asyncHandler(async (req, res) => {
  console.log("Request Body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory ");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//  Get specific contact
//  route GET /api/contacts/:id
//  Access Publically
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//  Update specific contact
//  route put /api/contacts/:id
//  Access Publically

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//  Delete specific contact
//  route delete /api/contacts/:id
//  Access Publically

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log("Contact not found");
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    await Contact.deleteOne();
    console.log("Contact removed successfully");
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error occurred in deleteContact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    if (!contactById) {
      console.log(`No contacts for id: '${contactId}'.`);
      return;
    }
    console.log(contactById);
    return contactById;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const checkContact = contacts.find((contact) => contact.id === contactId);

    if (!checkContact) {
      console.log(`There is no contact for id: ${contactId}.`);
    } else {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log("Contact has been removed.");
      return filteredContacts;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    let contact = contacts.filter((contact) => contact.id !== id);
    contact = {
      ...body,
    };

    const copyContacts = contacts.slice();
    const indexOfContact = copyContacts.findIndex(
      (contact) => contact.id === id
    );
    copyContacts.splice(indexOfContact, 1, contact);

    await fs.writeFile(contactsPath, JSON.stringify(copyContacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

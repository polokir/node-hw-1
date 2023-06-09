const path = require("path");
const { readFile, writeFile } = require("fs/promises");


const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contactsJson = await readFile(contactsPath, "utf-8");
  return JSON.parse(contactsJson);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const removedContact = await getContactById(contactId);
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return removedContact || null;
}

async function addContact(name, email, phone) {
  const { nanoid } = await import("nanoid");
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
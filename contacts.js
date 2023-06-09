const path = require("path");
const { readFile, writeFile } = require("fs/promises");


const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts= await readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeContact = await getContactById(contactId);
  const newContacts = contacts.filter((item) => item.id !== contactId);
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return removeContact || null;
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
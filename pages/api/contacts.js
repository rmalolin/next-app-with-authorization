import contacts from "../../storage/contacts.json";

export default async (req, res) => {
  // Get all contacts
  res.status(200).json(contacts);
};

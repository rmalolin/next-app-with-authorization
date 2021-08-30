import contacts from "../../storage/contacts.json";

export default async (req, res) => {
  res.status(200).json(contacts);
};

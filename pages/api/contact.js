import contacts from "../../storage/contacts.json";
import fs from "fs";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).json({ error: "Access forbiden" });
  }

  switch (req.method) {
    // Delete contact
    case "DELETE":
      const newContacts = contacts.filter(
        (contact) => contact.id !== req.body.id
      );

      fs.writeFileSync(
        "storage/contacts.json",
        JSON.stringify(newContacts, null, 4)
      );

      return res.status(200).json({});

    // Create new contact
    case "POST":
      const newContact = {
        id: new Date().toISOString(),
        name: req.body.name,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
      };

      const newContactsAdd = [newContact, ...contacts];

      fs.writeFileSync(
        "storage/contacts.json",
        JSON.stringify(newContactsAdd, null, 4)
      );

      return res.status(200).json(newContactsAdd);

    // Edit contact
    case "PUT":
      const newContactsEdit = contacts.map((contact) =>
        contact.id === req.body.id
          ? {
              ...contact,
              name: req.body.name,
              age: req.body.age,
              phoneNumber: req.body.phoneNumber,
            }
          : contact
      );

      fs.writeFileSync(
        "storage/contacts.json",
        JSON.stringify(newContactsEdit, null, 4)
      );

      return res.status(200).json(newContactsEdit);

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

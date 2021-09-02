import { getSession } from "next-auth/client";
import contacts from "../../storage/contacts.json";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).json({ error: "Access forbiden" });
  }

  // Get all contacts
  res.status(200).json(contacts);
};

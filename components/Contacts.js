import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/contacts")
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Table variant="striped" colorScheme="facebook">
      <TableCaption>Contacts</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Age</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contacts.map((contact) => (
          <Tr key={contact.id}>
            <Td>{contact.name}</Td>
            <Td isNumeric>{contact.age}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

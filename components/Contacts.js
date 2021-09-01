import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
  Heading,
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
    <>
      <Flex pt="4" justifyContent="space-between" alignItems="center">
        <Heading mt="2" ml="2" textColor="facebook.700">
          Contacts
        </Heading>
        <Button colorScheme="green" size="lg" mr="4">
          Add Contact
        </Button>
      </Flex>

      <Table variant="striped" colorScheme="facebook">
        <TableCaption>Contacts</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Age</Th>
            <Th isNumeric>Phone Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map((contact) => (
            <Tr key={contact.id}>
              <Td>{contact.name}</Td>
              <Td isNumeric>{contact.age}</Td>
              <Td isNumeric>{contact.phoneNumber}</Td>
              <Td isNumeric>
                <Button colorScheme="orange" bg="orange.700" size="sm" mr="2">
                  Edit
                </Button>
                <Button colorScheme="red" bg="red.500" size="sm">
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

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
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import AddEditModal from "./AddEditModal";

// Component to display User's contacts
export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState();
  const [searchValue, setSearchValue] = useState();
  // Custom hook from chakra-ui
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredCointacts = contacts.filter((contact) =>
    searchValue
      ? contact.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  const handleSearch = (event) => setSearchValue(event.target.value);

  useEffect(() => {
    axios
      .get("/api/contacts")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const removeContact = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id != id));
    axios.delete("/api/contact", {
      data: { id },
    });
  };

  const onModalClose = () => {
    if (editContact) {
      setEditContact(null);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Flex pt="4" mb="4" justifyContent="space-between" alignItems="center">
        <InputGroup ml="4">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="facebook.300" fontSize="14" ml="3" />}
          />
          <Input
            height="10"
            boxShadow="xl"
            borderColor="facebook.200"
            value={searchValue}
            onChange={handleSearch}
            type="text"
            placeholder="Search by name"
            fontSize="14"
            size="sm"
            width="60%"
          />
        </InputGroup>

        <Button
          boxShadow="xl"
          colorScheme="green"
          size="lg"
          mr="4"
          onClick={onOpen}
        >
          Add Contact
        </Button>
      </Flex>

      <AddEditModal
        isOpen={isOpen || editContact}
        onClose={onModalClose}
        setContacts={setContacts}
        editContact={editContact}
      />

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
          {filteredCointacts.map((contact) => (
            <Tr key={contact.id}>
              <Td>{contact.name}</Td>
              <Td isNumeric>{contact.age}</Td>
              <Td isNumeric>{contact.phoneNumber}</Td>
              <Td isNumeric>
                <Button
                  colorScheme="orange"
                  bg="orange.700"
                  size="sm"
                  mr="2"
                  boxShadow="xl"
                  onClick={() => setEditContact(contact)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  bg="red.500"
                  size="sm"
                  boxShadow="xl"
                  onClick={() => removeContact(contact.id)}
                >
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

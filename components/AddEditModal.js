import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

// Modal component for adding/editing contacts
export default function AddEditModal({
  isOpen,
  onClose,
  setContacts,
  editContact,
}) {
  const [isLoading, setIsLoading] = useState(false);
  // React-hook-form library
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => {
      return editContact;
    }, [editContact]),
  });

  useEffect(() => {
    reset(editContact);
  }, [editContact]);

  const onSubmit = ({ name, age, phoneNumber }) => {
    setIsLoading(true);
    // Depending on the edit/create action, we make an axios request
    if (editContact) {
      axios
        .put("api/contact", { id: editContact.id, name, age, phoneNumber })
        .then((data) => {
          setContacts(data.data);
          setIsLoading(false);
          onClose();
        });
    } else {
      axios.post("api/contact", { name, age, phoneNumber }).then((data) => {
        setContacts(data.data);
        setIsLoading(false);
        onClose();
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              {editContact ? "Edit Contact" : "Add Contact"}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Enter name..."
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 2,
                      message: "Minimum length should be 2",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.name}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  id="age"
                  placeholder="Enter age..."
                  {...register("age", {
                    required: "This is required",
                    minLength: {
                      value: 1,
                      message: "Minimum length should be 1",
                    },
                  })}
                />
              </FormControl>

              <FormControl mt={4} isInvalid={errors.name}>
                <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number..."
                  {...register("phoneNumber", {
                    required: "This is required",
                    minLength: {
                      value: 11,
                      message: "Minimum length should be 11",
                    },
                  })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                isLoading={isSubmitting || isLoading}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

import { Container, Heading, Text, Divider } from "@chakra-ui/react";
import { getSession, getProviders } from "next-auth/client";
import AuthInfo from "../components/AuthInfo";

// Home page
export default function Page({ providers }) {
  return (
    <Container maxW="3xl" pt="4">
      <AuthInfo providers={providers} />
      <Divider mt="6" borderColor="facebook.800" />
      <Heading mt="2">Contacts App</Heading>
      <Text mt="1" fontSize="xl">
        You can easily create, edit and remove contacts with the help of this
        application.
      </Text>
    </Container>
  );
}

// If session exists, redirect to Contacts Page
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/contacts",
        permanent: false,
      },
    };
  }

  return {
    props: { providers },
  };
}

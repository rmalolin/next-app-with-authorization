import { useSession, getSession } from "next-auth/client";
import AuthInfo from "../components/AuthInfo";
import { Container, Heading, Text, Divider } from "@chakra-ui/react";

export default function Page() {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Container maxW="3xl" pt="4">
        <AuthInfo />
        <Text>Access denied</Text>
      </Container>
    );
  }

  // If session exists, display content
  return (
    <Container maxW="3xl" pt="4">
      <AuthInfo />
      <Divider mt="6" borderColor="facebook.800" />
      <Heading mt="2">Contacts</Heading>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

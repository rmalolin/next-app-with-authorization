import { signIn, signOut, useSession } from "next-auth/client";
import {
  Container,
  Button,
  Flex,
  Text,
  Avatar,
  Heading,
} from "@chakra-ui/react";

export default function AuthInfo({ providers }) {
  const [session, loading] = useSession();

  return (
    <Container maxW="3xl" pt="4">
      {!session && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="20px" textColor="facebook.300">
            You are not signed in
          </Text>
          <Button
            colorScheme="facebook"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              signIn(providers.github.id);
            }}
          >
            Sign In with GitHub
          </Button>
        </Flex>
      )}

      {session && (
        <Flex justifyContent="space-between" alignItems="center">
          <Flex justifyContent="flex-start" alignItems="center">
            {session.user.image && (
              <Avatar
                size="xl"
                mr="4"
                showBorder
                borderColor="facebook.800"
                src={session.user.image}
                name={session.user.name}
              />
            )}
            <Text fontSize="16px">
              Signed in as{" "}
              <Heading size="md" textColor="facebook.900">
                {session.user.email || session.user.name}
              </Heading>
            </Text>
          </Flex>

          <Button
            colorScheme="facebook"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Container>
  );
}

import { Provider } from "next-auth/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// Chakra extendTheme for Divider (chakra component)
const theme = extendTheme({
  colors: {
    primary: {
      800: "#fff",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ChakraProvider>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
          theme={theme}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

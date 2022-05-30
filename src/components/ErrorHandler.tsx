import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, Button, Text } from "react-native";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { setNativeExceptionHandler } from "react-native-exception-handler";

const myErrorHandler = (error: Error) => {
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
};

// setJSExceptionHandler((error, isFatal) => {
//   // This is your custom global error handler
//   // You do stuff like show an error dialog
//   // or hit google analytics to track crashes
//   // or hit a custom api to inform the dev team.
// });

// const exceptionhandler = (exceptionString) => {
//   // your exception handler code here
// };
// setNativeExceptionHandler(
//   exceptionhandler,
//   forceAppQuit,
//   executeDefaultHandler
// );

function ErrorFallback({ resetErrorBoundary}: {resetErrorBoundary: any }) {
  return (
    <View style={[styles.container]}>
        <Text> Something went wrong: </Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
    </View>
  );
}

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
});
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "../cache"; // Ensure this file exists
 



export default function RootLayout() {
  return (
    <ClerkProvider 
      tokenCache={tokenCache} 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Stack screenOptions={{ headerShown: false }}>
       

        {/* If the user is signed in, navigate to (tabs) */}
        <SignedIn>
          <Stack.Screen name="/(tabs)" />
        </SignedIn>

        {/* If the user is NOT signed in, navigate to register */}
        <SignedOut>
         <Stack.Screen name="LoginScreen" />
         
        </SignedOut>

      </Stack>
    </ClerkProvider>
  );
}
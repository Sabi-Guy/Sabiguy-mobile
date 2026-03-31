import { Redirect } from "expo-router";

export default function ServiceProviderLoginRedirect() {
  return <Redirect href="/(auth)/login" />;
}

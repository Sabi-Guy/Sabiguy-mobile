import { Redirect } from "expo-router";

export default function ServiceUserLoginRedirect() {
  return <Redirect href="/(auth)/login" />;
}

import { Metadata } from "next"

import LoginTemplate from "@/modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Melden Sie sich bei Ihrem Konto im Potsdamer Bürgerstiftung Shop an.",
}

export default function Login() {
  return <LoginTemplate />
}

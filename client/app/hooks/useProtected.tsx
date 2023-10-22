import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import { ReactNode } from "react";

interface ProtectedProps{
children: ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth();
  return isAuthenticated ? children : redirect("/");
}
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin = user.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}

// export default function AdminProtected({ children }: ProtectedProps) {
//   const { user } = useSelector((state: any) => state.auth);
//   if (typeof window !== "undefined" && user) {
//     const isAdmin = user.role === "admin";
//     if (isAdmin) {
//       return children;
//     }
//   }
//   redirect("/");
// }

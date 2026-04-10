"use client";

import { useEffect, useState } from "react";

type AuthUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

export default function Page() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken") || "";
    const savedUser = localStorage.getItem("authUser");

    setToken(savedToken);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>{user ? `Welcome, ${user.firstname} ${user.lastname}` : "No logged-in user found."}</p>
      <p>{user ? `Username: ${user.username}` : "Please login first."}</p>
      <p>{token ? "Auth token saved successfully." : "No auth token found."}</p>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Setup() {
  const router = useRouter();
  const fetchSetup = async () => {
    try {
      const response = await fetch("/api/users/setup");
      if (!response.ok) {
        throw new Error("Failed to setup user");
      }
      const data = await response.json();
      router.replace("/home");
    } catch (error) {
      router.replace("/signin");
    }
  };

  useEffect(() => {
    fetchSetup();
  }, []);

  return (
    <div>
      <h1>Setup</h1>
    </div>
  );
}

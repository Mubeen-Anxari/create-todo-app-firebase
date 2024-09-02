"use client";
import React from "react";
import { AuthProvider } from "./AuthContext";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
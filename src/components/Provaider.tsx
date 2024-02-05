"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProvaiderProps {
  children: React.ReactNode;
}

const Provaider: React.FC<ProvaiderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provaider;

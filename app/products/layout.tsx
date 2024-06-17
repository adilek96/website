import { ChildProcess } from "child_process";
import React from "react";
import ShopModal from "@/components/ShopModal";
import Notification from "@/components/Notification";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopModal />
      <Notification />
      {children}
    </>
  );
}

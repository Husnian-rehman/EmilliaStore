"use client";

import dynamic from "next/dynamic";
import { HeaderProps } from "@/types";

const Header = dynamic(() => import("./Header").then(mod => ({ default: mod.Header })), { ssr: false });

export function HeaderWrapper(props: HeaderProps) {
  return <Header {...props} />;
}

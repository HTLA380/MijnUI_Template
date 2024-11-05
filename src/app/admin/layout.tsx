"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/loader/page-loader";

// Import the Navbar component dynamically to avoid layout shifting on page load
// when the useMediaQuery hook hasn't been initialized yet.

const DynamicNavbar = dynamic(() => import("./navbar"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicNavbar />
      {children}
    </>
  );
}

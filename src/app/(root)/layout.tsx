"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/loader/page-loader";

// Import the Layout component dynamically to avoid layout shifting on page load
// when the useMediaQuery hook hasn't been initialized yet.

const DynamicLayout = dynamic(() => import("@/components/layout"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DynamicLayout>{children}</DynamicLayout>;
}

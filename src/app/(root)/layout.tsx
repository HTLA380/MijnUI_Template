"use client";

import dynamic from "next/dynamic";
import PageLoader from "~/components/loader/PageLoader";

// Import the Layout component dynamically to avoid layout shifting on page load
// when the useMediaQuery hook hasn't been initialized yet.

const DynamicLayout = dynamic(() => import("~/components/layout/Layout"), {
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

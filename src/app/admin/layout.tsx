import dynamic from "next/dynamic";
import PageLoader from "~/components/loader/PageLoader";

// Import the Navbar component dynamically to avoid layout shifting on page load
// when the useMediaQuery hook hasn't been initialized yet.

const DynamicNavbar = dynamic(() => import("./Navbar"), {
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

import dynamic from "next/dynamic";
import PageLoader from "~/components/loader/PageLoader";

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

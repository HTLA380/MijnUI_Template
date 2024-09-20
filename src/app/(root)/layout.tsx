import dynamic from "next/dynamic";

import Loader from "@/components/loader/Loader";

const DynamicLayout = dynamic(() => import("@/components/layout/Layout"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <DynamicLayout>{children}</DynamicLayout>;
}

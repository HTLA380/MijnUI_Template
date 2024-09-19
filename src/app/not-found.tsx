import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full p-5 flex items-center justify-center flex-col h-screen">
      <div className="flex flex-col gap-2 items-center justify-center border border-main-border rounded-md w-full max-w-80 aspect-square">
        <h3 className="text-6xl font-extrabold">404</h3>
        <p>Page doesn&apos;t exists</p>
        <div>
          <p>
            Go back to{" "}
            <Link href={"/"} className="text-blue-500 hover:underline hover:text-blue-700">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

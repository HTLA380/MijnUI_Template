import React from "react";

import Link from "next/link";

const Home = () => {
  return (
    <main className="w-full mt-40 flex  items-center justify-center">
      <div className="flex items-center gap-3 flex-col justify-center">
        <h3 className="text-3xl font-extrabold">This page is currently under construction.</h3>
        <p>Here are the current available pages:</p>
        <div className="flex items-center gap-2 text-sm">
          <Link className="text-secondary-text hover:brightness-75 underline" href={"/contacts/customers/"}>
            Customer List
          </Link>
          <Link className="text-secondary-text hover:brightness-75 underline" href={"/contacts/customers/create"}>
            Add Customer
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

import React from "react";

import Link from "next/link";

const Home = () => {
  return (
    <main className="w-full mt-40 flex items-center justify-center">
      <div className="text-center md:text-left flex items-center gap-3 flex-col justify-center">
        <h3 className="text-xl md:text-3xl font-extrabold">This page is currently under construction.</h3>
        <p className="text-sm md:text-base">Here are the current available pages:</p>
        <div className="flex items-center gap-2 text-sm">
          <Link
            className="text-xs md:text-base text-secondary-text hover:brightness-75 underline"
            href={"/contacts/customers/"}
          >
            Customer List
          </Link>
          <Link
            className="text-xs md:text-base text-secondary-text hover:brightness-75 underline"
            href={"/contacts/customers/create"}
          >
            Add Customer
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

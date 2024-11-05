import React from "react";

import CustomerTable from "./components";

const Customers = () => {
  return (
    <div className="flex max-h-[calc(100vh-var(--navbar-height))] w-full flex-col items-center pt-4 md:max-h-[calc(100vh-var(--page-info-height)-var(--navbar-height))] md:pb-5 lg:max-h-[calc(100vh-var(--navbar-height))]">
      <CustomerTable />
    </div>
  );
};

export default Customers;

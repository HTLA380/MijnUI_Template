type TableHeaderItem = {
  name: string;
  className?: string;
  sortable?: boolean;
  displayOnMobile: boolean;
};

export const CustomerTableHeaderItems: TableHeaderItem[] = [
  {
    name: "Customer",
    className: "w-full min-w-44 cursor-pointer",
    sortable: true,
    displayOnMobile: true,
  },
  {
    name: "Phone",
    className: "w-full min-w-44",
    displayOnMobile: true,
  },
  {
    name: "Company",
    className: "w-full min-w-44",
    displayOnMobile: true,
  },
  {
    name: "Date/Time",
    className: "min-w-32",
    displayOnMobile: true,
  },
  {
    name: "Location",
    className: "w-full min-w-60",
    displayOnMobile: false,
  },
  {
    name: "Total",
    className: "min-w-24",
    displayOnMobile: true,
  },
  {
    name: "Transaction",
    className: "min-w-44",
    displayOnMobile: false,
  },
  {
    name: "Status",
    className: "",
    displayOnMobile: true,
  },
  {
    name: "",
    className: "w-14",
    displayOnMobile: true,
  },
];

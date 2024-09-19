import { ReactNode } from "react";

import { AiFillProduct } from "react-icons/ai";
import { BsBarChartLineFill } from "react-icons/bs";
import {
  FaAddressBook,
  FaBalanceScale,
  FaCashRegister,
  FaCircle,
  FaDownload,
  FaGem,
  FaImage,
  FaList,
  FaPeopleCarry,
  FaShieldAlt,
  FaTags,
  FaTruck,
  FaUsers,
  FaWarehouse,
  FaWrench,
} from "react-icons/fa";
import {
  FaArrowTrendUp,
  FaCirclePlus,
  FaClockRotateLeft,
  FaShop,
  FaSquareMinus,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6";
import { RxLoop } from "react-icons/rx";

export type SidebarListsType = {
  icon?: ReactNode;
  title: string;
  list?: {
    name: string;
    link: string;
  }[];
  link?: string;
};

export type SidebarDataType = {
  title: string;
  icon?: ReactNode;
  contentTitle: string;
  lists: SidebarListsType[];
};

export const SidebarData: SidebarDataType[] = [
  {
    title: "Contacts",
    icon: <FaAddressBook />,
    contentTitle: "CONTACTS",
    lists: [
      {
        icon: <FaPeopleCarry />,
        title: "Suppliers",
        list: [
          {
            name: "Suppliers List",
            link: "/contacts/suppliers",
          },
          {
            name: "Add Supplier",
            link: "/contacts/suppliers/create",
          },
        ],
      },
      {
        icon: <FaUserGroup />,
        title: "Customers",
        list: [
          {
            name: "Customer List",
            link: "/contacts/customers",
          },
          {
            name: "Add Customer",
            link: "/contacts/customers/create",
          },
        ],
      },
      {
        icon: <FaUsers />,
        title: "Customer Groups",
        list: [
          {
            name: "Customer groups List",
            link: "/contacts/customer-group",
          },
        ],
      },
      {
        icon: <FaDownload />,
        title: "Import Contacts",
        link: "/contacts/import-contacts",
      },
    ],
  },
  /* -------------------------------------------------------------------------- */

  {
    title: "Products",
    icon: <AiFillProduct />,
    contentTitle: "PRODUCTS",
    lists: [
      {
        icon: <FaList />,
        title: "List Products",
        link: "/product",
      },
      {
        icon: <FaCirclePlus />,
        title: "Add Products",
        link: "/product/add",
      },
      {
        icon: <FaArrowTrendUp />,
        title: "Current Stocks",
        link: "/reports/current-stock-balance/product",
      },
      {
        icon: <FaCircle />,
        title: "Variation",
        link: "/variation",
      },
      {
        icon: <FaDownload />,
        title: "Import Product",
        link: "/import-product",
      },
      {
        icon: <FaImage />,
        title: "Import Gallery",
        link: "/product/gallery",
      },
      {
        icon: <FaBalanceScale />,
        title: "Unit",
        link: "/unit-category",
      },
      {
        icon: <FaTags />,
        title: "Category",
        link: "/category",
      },
      {
        icon: <FaGem />,
        title: "Brand",
        link: "/brands",
      },
      {
        icon: <FaShieldAlt />,
        title: "Warranties",
        link: "/warranties",
      },
      {
        icon: <FaWrench />,
        title: "Manufacturer",
        link: "/manufacturer",
      },
      {
        icon: <FaTags />,
        title: "Generic",
        link: "/generic",
      },
      {
        icon: <FaCircle />,
        title: "Price List",
        link: "/price-list-detail",
      },
      {
        icon: <FaDownload />,
        title: "Import Price List",
        link: "/import/price-list",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */

  {
    title: "Sell",
    icon: <FaShop />,
    contentTitle: "SALES ORDER",
    lists: [
      {
        icon: <FaSquarePlus />,
        title: "Add Sale",
        link: "/sell/create/page",
      },
      {
        icon: <FaList />,
        title: "All Sale",
        link: "/sell/allSales/sales",
      },
      {
        icon: <FaList />,
        title: "Sale List",
        link: "/sell/sales/sales",
      },
      {
        icon: <FaList />,
        title: "POS Sale List",
        link: "/sell/posSales/sales",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */

  {
    title: "POS",
    icon: <FaCashRegister />,
    contentTitle: "POINT OF SALE",
    lists: [
      {
        icon: <FaCashRegister />,
        title: "POS",
        link: "/pos/select",
      },
      {
        icon: <FaList />,
        title: "POS Register List",
        link: "/pos/register/list",
      },
      {
        icon: <FaList />,
        title: "POS Sessions",
        link: "/pos/session/list",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */

  {
    title: "Inventory",
    icon: <FaWarehouse />,
    contentTitle: "INVENTORY",
    lists: [
      {
        icon: <FaDownload />,
        title: "Opening Stock",
        list: [
          {
            name: "List Opening Stocks",
            link: "/openingStock/list",
          },
          {
            name: "Add Opening Stock",
            link: "/openingStock",
          },
          {
            name: "Import Opening Stock",
            link: "/import/openingStock",
          },
        ],
      },
      {
        icon: <FaSquarePlus />,
        title: "Stock In",
        list: [],
      },
      {
        icon: <FaSquareMinus />,
        title: "Stock Out",
        list: [],
      },
      {
        icon: <FaTruck />,
        title: "Stock Transfer",
        list: [
          {
            name: "Stock Transfer List",
            link: "/contacts/stock-transfer",
          },
          {
            name: "Create Stock Transfer",
            link: "/contacts/stock-transfer/create",
          },
        ],
      },
      {
        icon: <RxLoop />,
        title: "Stock Adjustment",
        list: [
          {
            name: "Adjustment List",
            link: "/stock-adjustment",
          },
          {
            name: "Create Adjustment",
            link: "/stock-adjustment/create",
          },
        ],
      },
      {
        icon: <FaArrowTrendUp />,
        title: "Current Stocks",
        link: "/reports/current-stock-balance/inventory",
      },
      {
        icon: <FaClockRotateLeft />,
        title: "Stocks History",
        link: "/stock-history/list",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */

  {
    title: "Reports",
    icon: <BsBarChartLineFill />,
    contentTitle: "REPORTS",
    lists: [
      {
        title: "Profit/Loss Report",
        link: "/profit-loss/report",
      },
      {
        title: "Purchase & Sales Report",
        link: "/sale-purchase/report",
      },
      {
        title: "Expense Report",
        link: "/expense/report",
      },
      {
        title: "Item Report",
        link: "/items/report",
      },

      {
        title: "Opening Stock Report",
        list: [
          {
            name: "Opening Stock Summary",
            link: "/opening-stock/report/summary",
          },
          {
            name: "Opening Stock Detail",
            link: "/opening-stock/report/detail",
          },
        ],
      },
      {
        title: "Sales Reports",
        list: [
          {
            name: "Sales Summary",
            link: "/reports/sales",
          },
          {
            name: "Sales Detail",
            link: "/reports/sales-detail",
          },
        ],
      },
      {
        title: "Purchase Reports",
        list: [
          {
            name: "Purchase Summary",
            link: "/reports/purchase",
          },
          {
            name: "Purchase Detail",
            link: "/reports/purchase-detail",
          },
        ],
      },
      {
        title: "Inventory Reports",
        list: [
          {
            name: "Stock Transfer Summary",
            link: "/reports/stock-transfer-report",
          },
          {
            name: "Stock Transfer Details",
            link: "/reports/transfer-details-report",
          },
          {
            name: "Stock Adjustment Summary",
            link: "/reports/stock-adjustment-report",
          },
          {
            name: "Stock Adjustment Details",
            link: "/reports/adjustment-details-report",
          },
          {
            name: "Current Stock Balance",
            link: "/reports/current-stock-balance/report",
          },
          {
            name: "Stock History",
            link: "/stock-history/list",
          },
        ],
      },

      {
        title: "Inventory Reports",
        list: [
          {
            name: "Stock Transfer Summary",
            link: "/reports/stock-transfer-report",
          },
          {
            name: "Stock Transfer Details",
            link: "/reports/transfer-details-report",
          },
          {
            name: "Stock Adjustment Summary",
            link: "/reports/stock-adjustment-report",
          },
          {
            name: "Stock Adjustment Details",
            link: "/reports/adjustment-details-report",
          },
          {
            name: "Current Stock Balance",
            link: "/reports/current-stock-balance/report",
          },
          {
            name: "Stock History",
            link: "/stock-history/list",
          },
        ],
      },
      {
        title: "Stock Alerts",
        list: [
          {
            name: "Quantity Alert",
            link: "/reports/alert-quantity",
          },
          {
            name: "Expire Alert ",
            link: "/reports/alert-expire",
          },
        ],
      },
    ],
  },
];

export const isExistingUrl = (url: string) => {
  return (
    SidebarData.some((data) => data.lists.some((list) => list.link === url)) ||
    SidebarData.some((data) => data.lists.some((list) => list.list?.some((item) => item.link === url)))
  );
};

export const getSidebarActiveTitle = (url: string): string | undefined => {
  for (const data of SidebarData) {
    if (data.lists[0]?.link === url) {
      return data.lists[0].title;
    }
    for (const list of data.lists) {
      if (list.link === url) {
        return list.title;
      }
      if (list.list) {
        for (const item of list.list) {
          if (item.link === url) {
            return item.name;
          }
        }
      }
    }
  }
  return undefined;
};

import { AiFillProduct } from "react-icons/ai"
import { BsBarChartLineFill } from "react-icons/bs"
import {
  FaAddressBook,
  FaCashRegister,
  FaEnvelope,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaMoneyCheck,
  FaSms,
  FaTruckLoading,
  FaUsers,
  FaUtensilSpoon,
  FaWarehouse,
} from "react-icons/fa"
import {
  FaCartShopping,
  FaCodeCompare,
  FaGears,
  FaHandHoldingDollar,
  FaShop,
} from "react-icons/fa6"
import { PiTreeViewFill } from "react-icons/pi"

export const ALL_APPS = [
  {
    title: "User & Role",
    link: "/users",
    icon: <FaUsers />,
  },
  {
    title: "Contacts",
    link: "/contacts/customers",
    icon: <FaAddressBook />,
  },
  {
    title: "Products",
    link: "/product",
    icon: <AiFillProduct />,
  },
  {
    title: "Purchase",
    link: "/purchase/list",
    icon: <FaCartShopping />,
  },
  {
    title: "Sell",
    link: "/sell/allSales/sales",
    icon: <FaShop />,
  },
  {
    title: "POS",
    link: "/pos/register/list",
    icon: <FaCashRegister />,
  },
  {
    title: "Inventory",
    link: "/openingStock/list",
    icon: <FaWarehouse />,
  },
  {
    title: "Reports",
    link: "/profit-loss/report",
    icon: <BsBarChartLineFill />,
  },
  {
    title: "Card & Payment",
    link: "/payment-account/list",
    icon: <FaMoneyCheck />,
  },
  {
    title: "Expense",
    link: "/expense-report/list",
    icon: <FaHandHoldingDollar />,
  },
  {
    title: "SMS",
    link: "/SMS/smspoh/dashboard",
    icon: <FaSms />,
  },
  {
    title: "Mail",
    link: "/mail/compose",
    icon: <FaEnvelope />,
  },
  {
    title: "Invoice",
    link: "/invoice/index",
    icon: <FaFileInvoice />,
  },
  {
    title: "Settings",
    link: "/settings/business",
    icon: <FaGears />,
  },
  {
    title: "App Module",
    link: "/settings/business",
    icon: <PiTreeViewFill />,
  },
  {
    title: "API",
    link: "/api-management",
    icon: <FaCodeCompare />,
  },
  {
    title: "Stock In/Out",
    link: "/stockin/upcoming",
    icon: <FaTruckLoading />,
  },
  {
    title: "Tax",
    link: "/tax",
    icon: <FaFileInvoiceDollar />,
  },
  {
    title: "Restaurant",
    link: "/restaurant/table/list",
    icon: <FaUtensilSpoon />,
  },
]

export const getExistingApps = () => {
  return ALL_APPS.map(({ link }) => link)
}

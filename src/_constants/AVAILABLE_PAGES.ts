type availablePagesType = {
  name: string
  url: string
}

export const AVAILABLE_PAGES: availablePagesType[] = [
  {
    name: "Customer List",
    url: "/contacts/customers/",
  },
  {
    name: "Add Customer",
    url: "/contacts/customers/create",
  },
]

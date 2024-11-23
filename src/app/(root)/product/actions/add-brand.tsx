import { FormEvent } from "react"

const addBrandAction = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  console.log(
    `Brand: ${formData.get("brand-name")}, Description: ${formData.get("brand-description")}`,
  )
}

export default addBrandAction

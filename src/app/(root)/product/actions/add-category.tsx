import { FormEvent } from "react"

const addCategoryAction = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  console.log(
    `Category: ${formData.get("category-name")}, Description: ${formData.get("category-description")}`,
  )
}

export default addCategoryAction

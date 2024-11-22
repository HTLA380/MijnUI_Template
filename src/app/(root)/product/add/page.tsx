"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@mijn-ui/components/button"
import { Dialog } from "@mijn-ui/components/dialog"
import Spinner from "@/components/loader/spinner"
import addBrandAction from "@/app/(root)/product/actions/add-brand"
import AddModalContent from "@/app/(root)/product/add/components/add-modal-content"
import ImageUpload, {
  ImageUploadField,
} from "@/app/(root)/product/add/components/image-upload"
import InputGroup, {
  InputField,
} from "@/app/(root)/product/add/components/input-group"
import SelectGroup, {
  SelectField,
} from "@/app/(root)/product/add/components/select-group"
import { useCreateProduct } from "@/app/(root)/product/hooks/use-products"
import { toast } from "sonner"

const CreateProduct = () => {
  const router = useRouter()

  const [modalId, setModalId] = useState<number>(0)
  const { mutate: addProduct, isPending } = useCreateProduct({
    onSuccess: () => {
      toast.success("New product added successfully!", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
      router.push("/product")
    },
    onError: () => {
      toast.error("Failed to add new product!, please try again later.", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
    },
  })

  const handleModalOpen = (id: number) => {
    setModalId(id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProduct()
  }

  return (
    <Dialog>
      <form
        className="mt-0 h-full w-full flex flex-col gap-10 rounded-2xl bg-surface p-5 md:mt-3 lg:mt-0"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {ProductFormItems.imageUploadFields.map((item) => (
          <ImageUpload key={item.id} {...item} />
        ))}
        <div className="grid gap-6 md:10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {ProductFormItems.inputFields.map((item) => (
            <InputGroup key={item.id} {...item} />
          ))}
        </div>
        <div className="grid gap-6 md:10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {ProductFormItems.selectFields.map((item, index) => (
            <SelectGroup
              key={item.id}
              {...item}
              handleModalOpen={() => handleModalOpen(index)}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="px-6">
            Save
            {isPending && <Spinner className="h-4 w-4" />}
          </Button>
        </div>
      </form>
      {AddModalItems.map(
        (item, index) =>
          index === modalId && (
            <AddModalContent
              key={index}
              {...item}
              handleSubmit={modalSubmitHandlers[index]}
            />
          ),
      )}
    </Dialog>
  )
}

const modalSubmitHandlers = [addBrandAction, addBrandAction]

type ProductFormItemsType = {
  imageUploadFields: ImageUploadField[]
  inputFields: InputField[]
  selectFields: SelectField[]
}

const ProductFormItems: ProductFormItemsType = {
  imageUploadFields: [{ id: "product-image", name: "product-image" }],
  inputFields: [
    {
      label: "Product Name",
      type: "text",
      placeholder: "Product Name...",
      id: "product-name",
      name: "product-name",
    },
    {
      label: "SKU",
      type: "text",
      placeholder: "SKU...",
      id: "sku",
      name: "sku",
    },
    {
      label: "Selling Price",
      type: "number",
      placeholder: "Selling Price...",
      id: "selling-price",
      name: "selling-price",
    },
    {
      label: "Stock",
      type: "number",
      placeholder: "Stock...",
      id: "stock",
      name: "stock",
    },
    {
      label: "Alert Quantity",
      type: "number",
      placeholder: "Alert Quantity...",
      id: "alert-quantity",
      name: "alert-quantity",
    },
  ],
  selectFields: [
    {
      label: "Brand",
      placeholder: "Select a brand",
      name: "brand",
      id: "brand",
      addable: true,
      selectItems: [
        {
          label: "IKEA",
          value: "ikea",
        },
        {
          label: "Nike",
          value: "nike",
        },
        {
          label: "Adidas",
          value: "adidas",
        },
      ],
    },
    {
      label: "Category",
      placeholder: "Select a Category",
      name: "category",
      id: "category",
      addable: true,
      selectItems: [
        {
          label: "Beauty",
          value: "beauty",
        },
        {
          label: "Fragrances",
          value: "fragrances",
        },
        {
          label: "Groceries",
          value: "groceries",
        },
      ],
    },
  ],
}

const AddModalItems = [
  {
    title: "Add a New Brand",
    inputFields: [
      {
        label: "Brand Name",
        type: "text",
        placeholder: "Brand Name...",
        id: "brand-name",
        name: "brand-name",
      },
      {
        label: "Short Description",
        type: "text",
        placeholder: "Short Description...",
        id: "brand-description",
        name: "brand-description",
      },
    ],
  },
  {
    title: "Add a New Category",
    inputFields: [
      {
        label: "Category Name",
        type: "text",
        placeholder: "Category Name...",
        id: "category-name",
        name: "category-name",
      },
      {
        label: "Short Description",
        type: "text",
        placeholder: "Short Description...",
        id: "category-description",
        name: "category-description",
      },
    ],
  },
]

export default CreateProduct

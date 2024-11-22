"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Button } from "@mijn-ui/components/button"
import { Input } from "@mijn-ui/components/input"
import { Label } from "@mijn-ui/components/label"
import { FaX } from "react-icons/fa6"
import { IconContext } from "react-icons/lib"
import { LuImagePlus } from "react-icons/lu"

export type ImageUploadField = {
  id: string
  name: string
}

const ImageUpload = ({ id, name }: ImageUploadField) => {
  const [selectedImage, setSelectedImage] = useState<string>()

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]

    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const handleImageRemove = () => {
    setSelectedImage("")
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="product-image">Product Image</Label>
      <div className="relative w-max">
        <div
          className={`flex flex-col justify-center items-center gap-4 md:6 text-neutral-text rounded-md border border-main-border px-4 py-6 md:p-8 `}
        >
          <IconContext.Provider
            value={{ className: "text-[3.5em] md:text-[5em]" }}
          >
            <LuImagePlus />
          </IconContext.Provider>

          <p className="text-xs md:text-sm text-center">
            Click to browse or <br /> Drag and Drop image
          </p>
        </div>

        <Input
          type="file"
          accept="image/*"
          id={id}
          name={name}
          className="absolute top-0 left-0 h-full"
          classNames={{
            input: "block opacity-0 cursor-pointer w-full h-full",
          }}
          onChange={(e) => handleImageUpload(e)}
        />

        {selectedImage && (
          <Image
            src={selectedImage}
            alt={`img-${selectedImage}`}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-md"
            fill
          />
        )}
        {selectedImage && (
          <Button
            className="absolute -top-3 -right-3 w-6 h-6 p-0"
            size={"sm"}
            radius={"full"}
            color="danger"
            onClick={handleImageRemove}
          >
            <FaX size={12} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ImageUpload

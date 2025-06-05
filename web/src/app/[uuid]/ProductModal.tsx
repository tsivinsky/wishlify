"use client";

import { CreateProductData, useCreateProductMutation } from "@/api/product";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { useModal } from "@/hooks/useModal";
import { Controller, useForm } from "react-hook-form";
import { ProductDropzone } from "./ProductDropzone";
import { useQueryClient } from "@tanstack/react-query";
import { wishlistQuery } from "@/api/wishlist";
import { Wishlist } from "@/types/wishlist";

type FormFields = Omit<CreateProductData, "wishlistId" | "imageId"> & {
  imageId: string | null;
};

export type ProductModalProps = {
  wishlist: Wishlist;
};

export const ProductModal = ({ wishlist }: ProductModalProps) => {
  const queryClient = useQueryClient();
  const modal = useModal();

  const createProductMutation = useCreateProductMutation();

  const form = useForm<FormFields>();

  const handleCloseModal = () => {
    form.reset();
    modal.close();
  };

  const onSubmit = form.handleSubmit((data) => {
    if (!data.imageId) return;

    createProductMutation.mutate(
      {
        wishlistId: wishlist.id,
        name: data.name,
        price: data.price,
        currency: data.currency,
        imageId: data.imageId,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(wishlistQuery(wishlist.uuid));
          handleCloseModal();
        },
      },
    );
  });

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        title="Add Product"
        width={600}
        onClose={handleCloseModal}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            label="Name"
            {...form.register("name", {
              required: "Required field",
            })}
          />
          <div className="flex gap-1 w-full">
            <Select
              label="Currency"
              className="min-w-fit"
              {...form.register("currency")}
            >
              <option value="RUB">Ruble (₽)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </Select>
            <Input
              type="text"
              label="Price"
              className="w-full"
              {...form.register("price", {
                required: "Required field",
                valueAsNumber: true,
              })}
            />
          </div>
          <Controller
            control={form.control}
            name="imageId"
            render={({ field }) => (
              <ProductDropzone
                image={field.value}
                onChange={(image) => field.onChange(image.uuid)}
              />
            )}
          />
          <Button type="submit" className="mt-8">
            Add
          </Button>
        </form>
      </Modal>
      <Button onClick={modal.open}>Add Product</Button>
    </>
  );
};

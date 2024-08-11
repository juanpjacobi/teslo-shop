"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes del file system",
    };
  }
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  try {
    await cloudinary.uploader.destroy(`teslo-shop/${imageName}`);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
            gender: true
          },
        },
      },
    });
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
    revalidatePath(`/gender/${deletedImage.product.gender}`);




  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};

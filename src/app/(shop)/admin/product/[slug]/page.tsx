import { getCategories, getProductbySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([getProductbySlug(slug), getCategories()]);

  if (!product && slug !== 'new') {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "Nuevo producto" : "Editar Producto";
  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}

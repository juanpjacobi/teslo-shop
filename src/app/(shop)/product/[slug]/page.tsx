export const revalidate = 604800;

import { ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow } from "../../../../components/product/slideshow/ProductMobileSlideshow";
import { getProductbySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductbySlug(slug);
 
  return {
    title: product?.title ?? 'Product no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductsBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductbySlug(slug);
  console.log(product);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* desktop slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block md:w-[80%] m-auto"
        />
        {/* mobiles slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>
      {/* details */}
      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug}/>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product}/>        

        {/* description */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-ligth">{product.description}</p>
      </div>
    </div>
  );
}

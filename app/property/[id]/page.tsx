import ProductDetailsClient from "./client";

interface Params {
  params: Promise<{ id: string }>;
}
const ProductDetailsPage = async ({ params }: Params) => {
  const { id } = await params;
  return <ProductDetailsClient id={id} />;
};

export default ProductDetailsPage;

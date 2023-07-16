import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleProductQuery } from '@/redux/features/products/productApi';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading } = useSingleProductQuery(id);

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-xl">Author: {product?.author}</p>
          <p className="text-xl">Genre: {product?.genre}</p>
          <p className="text-xl">
            Publication Date: {product?.publicationDate}
          </p>
          <Button>+ Wishlist</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}

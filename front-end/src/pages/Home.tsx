import ProductCard from '@/components/ProductCard';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import { IBook } from '@/types/globalTypes';

export default function Home() {
  const { data, isLoading, error } = useGetProductsQuery(undefined);

  const productsData = data?.data;
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            productsData?.map((product: IBook) => (
              <ProductCard
                key={`${product.title} + ${product.publicationDate} `}
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

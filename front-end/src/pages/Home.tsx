import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import { IBook } from '@/types/globalTypes';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductsQuery(undefined);

  // show only 10 data in home
  const productsData = data?.data ? data?.data.slice(0, 10) : [];

  const gotToBooks = () => {
    navigate('/books');
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto ">
        <div className="col-span-9 grid grid-cols-5 gap-10 pb-8">
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
        <div className="pb-8">
          <Button
            onClick={gotToBooks}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          >
            View All Books
          </Button>
        </div>
      </div>
    </>
  );
}

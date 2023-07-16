import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import { setYearRange } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';

export default function Products() {
  const { data, isLoading } = useGetProductsQuery(undefined);

  const { filterYear, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setYearRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; publicationDate: string }) =>
        item.status === true &&
        Number(item.publicationDate.slice(-4)) < filterYear
    );
  } else if (filterYear > 0) {
    productsData = data?.data?.filter(
      (item: { publicationDate: string }) =>
        Number(item.publicationDate.slice(-4)) < filterYear
    );
  } else {
    productsData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Publish Year</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[2030]}
              max={2030}
              min={1800}
              step={10}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>Year: From 0 To {filterYear}</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          productsData?.map((product: IBook) => (
            <ProductCard
              key={`${product.title} + ${product.author}`}
              product={product}
            />
          ))
        )}
      </div>
    </div>
  );
}

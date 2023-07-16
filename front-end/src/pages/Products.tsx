/* eslint-disable @typescript-eslint/ban-ts-comment */
import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import { setYearRange } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);
  const { data, isLoading } = useGetProductsQuery(undefined);
  const { filterYear, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  let productsData: IBook[];

  // filter data
  useEffect(() => {
    let filteredBooks: IBook[];

    if (status) {
      filteredBooks = data?.data.filter(
        (item: { status: boolean; publicationDate: string }) =>
          item.status === true &&
          Number(item.publicationDate.slice(-4)) < filterYear
      );
    } else if (filterYear > 0) {
      filteredBooks = data?.data?.filter(
        (item: { publicationDate: string }) =>
          Number(item.publicationDate.slice(-4)) < filterYear
      );
    } else {
      filteredBooks = data?.data;
    }

    setSearchResults(filteredBooks);
  }, [data, filterYear, status]);

  // slider handler
  const handleSlider = (value: number[]) => {
    dispatch(setYearRange(value[0]));
  };

  // search bar result
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    const filteredBooks = searchResults.filter((book: IBook) => {
      const { title, author, genre } = book;
      const lowerCaseTerm = searchTerm.toLowerCase();
      return (
        title.toLowerCase().includes(lowerCaseTerm) ||
        author.toLowerCase().includes(lowerCaseTerm) ||
        genre.toLowerCase().includes(lowerCaseTerm)
      );
    });

    setSearchResults(filteredBooks);
  }, [searchTerm, searchResults]);

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
      <div className="col-span-9">
        <div>
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="pt-4 col-span-9 grid grid-cols-3 gap-10 pb-20">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            searchResults?.map((product: IBook) => (
              <ProductCard
                key={`${product.title} + ${product.author}`}
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

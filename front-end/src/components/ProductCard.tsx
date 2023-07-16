/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { IBook } from '@/types/globalTypes';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeleteBookMutation } from '@/redux/features/products/productApi';

interface IProps {
  product: IBook;
}

export default function ProductCard({ product }: IProps) {
  const [deleteBook] = useDeleteBookMutation();
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IBook) => {
    dispatch(addToCart(product));
    alert('Added to wishlist');
  };

  const handleDeleteProduct = (product: IBook) => {
    const result = window.confirm('Are you sure you want to delete this book?');

    if (result) {
      deleteBook(product._id!);
    }
  };

  return (
    <div>
      <div className="pt-4 rounded flex flex-col items-start justify-between p-2 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <div className="mx-auto">
          <Link to={`/books/${product._id}`} className="w-1/2">
            <img src={product?.image} className="rounded" alt="product" />
            <p className="font-semibold">{product?.title}</p>
          </Link>
        </div>
        <p className="text-sm">Author: {product?.author}</p>
        <p>Rating: {product?.genre}</p>
        <p className="text-sm">Publish Date: {product?.publicationDate}</p>
        <div className="flex justify-center">
          <Button
            variant="default"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
            onClick={() => handleAddProduct(product)}
          >
            + wishlist
          </Button>
          <Button
            variant="ghost"
            className="mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-200 rounded shadow"
          >
            <BiSolidEdit size="25" />
          </Button>
          <Button
            variant="ghost"
            className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-200 rounded shadow"
            onClick={() => handleDeleteProduct(product)}
          >
            <AiOutlineDelete size="25" />
          </Button>
        </div>
      </div>
    </div>
  );
}

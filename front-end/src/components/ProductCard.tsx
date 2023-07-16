import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';

interface IProps {
  product: IBook;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IBook) => {
    // dispatch(addToCart(product));
    toast({
      description: 'added to wishlist',
    });
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
        <Button
          variant="default"
          onClick={() => handleAddProduct(product)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
        >
          Add to wishlist
        </Button>
      </div>
    </div>
  );
}

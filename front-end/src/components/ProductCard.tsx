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
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl flex flex-col items-start justify-between p-2 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-1/2">
          <img src={product?.image} className="w-1/2" alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>
        </Link>
        <p className="text-sm">Author: {product?.author}</p>
        <p>Rating: {product?.genre}</p>
        <p className="text-sm">Publish Date: {product?.publicationDate}</p>
        <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to wishlist
        </Button>
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { useNavigate } from 'react-router-dom';

import { IBook } from '@/types/globalTypes';
import { usePostBookMutation } from '@/redux/features/products/productApi';

export default function AddBook() {
  const { user } = useAppSelector((state) => state.user);
  const [postBook] = usePostBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    const options = {
      email: user.email,
      data,
    };

    postBook(options);
    reset();

    alert('Book added successfully');
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Book Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Title
              </Label>
              <Input
                id="title"
                placeholder="title of book"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('title', { required: 'title is required' })}
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
              <Label className="sr-only" htmlFor="email">
                Author
              </Label>
              <Input
                id="author"
                placeholder="author of book"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('author', { required: 'author is required' })}
              />
              {errors.author && (
                <p className="text-red-600">{errors.author.message}</p>
              )}
              <Label className="sr-only" htmlFor="email">
                image
              </Label>
              <Input
                id="image"
                placeholder="image of book"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('image', { required: 'image is required' })}
              />
              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
              <Label className="sr-only" htmlFor="email">
                Genre
              </Label>
              <Input
                id="genre"
                placeholder="genre of book"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('genre', { required: 'genre is required' })}
              />
              {errors.genre && (
                <p className="text-red-600">{errors.genre.message}</p>
              )}
              <Label className="sr-only" htmlFor="email">
                Publishing Date
              </Label>
              <Input
                id="publicationDate"
                placeholder="publication Date of book --> XXXX-DD, YYYY"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('publicationDate', {
                  required: 'publicationDate is required',
                })}
              />
              {errors.publicationDate && (
                <p className="text-red-600">{errors.publicationDate.message}</p>
              )}
            </div>
            <Button>Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

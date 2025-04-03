import {
    fetchProductById
} from '@/app/lib/data';
import { notFound } from 'next/navigation';



export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([
    fetchProductById(id)
  ]);
  if (!product) {
    notFound();
  }
  return (
    <main>
      this is product id = ??
      <h1>{product.id}</h1>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.images[0]}</p>
      <img src={product.images[0]} alt="didn't work" />
    </main>
  );
}
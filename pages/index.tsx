import { Product } from '../types';

type Props = {
  products: Product[];
};

export default function Home(props: Props) {
  return (
    <ul>
      {props.products.map(product => (
        <li key={product.id}>
          {product.id}: {product.name}
        </li>
      ))}
    </ul>
  );
}

type GetStaticPropsReturn = {
  props: Props;
};

export async function getStaticProps(): Promise<GetStaticPropsReturn> {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();
  return {
    props: {
      products: products,
    },
  };
}

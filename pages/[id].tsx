import { Product } from '../types';

type Props = {
  product: Product;
};

export default function Home(props: Props) {
  return (
    <>
      {props.product.id}: {props.product.name}
    </>
  );
}

export async function getStaticProps(ctx): Promise<{ props: Props }> {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();
  return {
    props: {
      product: products.find(product => product.id === Number(ctx.params.id)),
    },
  };
}

export async function getStaticPaths() {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();

  const paths = products.map(product => ({
    params: { id: String(product.id) },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

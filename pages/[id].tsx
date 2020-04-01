import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Product } from '../types';

type Props = {
  product: Product;
};

const ProductPage: NextPage<Props> = props => {
  return (
    <>
      {props.product.id}: {props.product.name}
    </>
  );
};

export default ProductPage;

const getStaticProps: GetStaticProps = async (
  ctx,
): Promise<{ props: Props }> => {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();
  return {
    props: {
      product: products.find(product => product.id === Number(ctx.params.id)),
    },
  };
};

export { getStaticProps };

const getStaticPaths: GetStaticPaths = async () => {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();

  const paths = products.map(product => ({
    params: { id: String(product.id) },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export { getStaticPaths };

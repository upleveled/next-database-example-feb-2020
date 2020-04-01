import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Product } from '../types';

type Props = {
  products: Product[];
};

const Home: NextPage<Props> = props => {
  return (
    <ul>
      {props.products.map(product => (
        <li key={product.id}>
          {product.id}: {product.name}
        </li>
      ))}
    </ul>
  );
};

export default Home;

type GetStaticPropsReturn = {
  props: Props;
};

const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsReturn> => {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();
  return {
    props: {
      products: products,
    },
  };
};

export { getStaticProps };

export default function Home(props) {
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

export async function getStaticProps() {
  const { getAllProducts } = await import('../database');
  const products = await getAllProducts();
  return {
    props: {
      products: products,
    },
  };
}

import { GetStaticProps } from "next";
import { Tittle } from "../styles/pages/home";

type IProduct = {
  id: string;
  title: string;
};

type Top10Props = {
  products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <section>
    <Tittle>Products</Tittle>
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  </section>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 5,
  }
} 
import { GetServerSideProps } from 'next';
import { SEO } from '../components/SEO';


import { Tittle } from '../styles/pages/home';

type IProduct = {
  id: string;
  title: string;
};

type HomeProps = {
  recommendedProducts: IProduct[];
};

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import('../lib/math')).default;

    console.log(process.env.NEXT_PUBLIC_API_URL);

    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO  
        title="DevCommerce, your best e-commerce" 
        image="logo-next.png"
        shouldExcludeTitleSuffix 
      />

      <section>
        <Tittle>Products</Tittle>
        <ul>
          {recommendedProducts?.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>

      <button type="button" onClick={handleSum}>sum</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  }
}

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { client } from '../../../lib/prismic';

type ProductProps = {
  product: Document;
};


export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <Image 
        src={product.data.thumbnail.url} 
        alt={product.data.title}
        width={300}
        height={200}
        objectFit="contain"
      />

      <div dangerouslySetInnerHTML={{
        __html: PrismicDOM.RichText.asHtml(product.data.description)
      }}></div>

      <p>Price: {product.data.price}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product
    }, 
    revalidate: 10,
  }
}
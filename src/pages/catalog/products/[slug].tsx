import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  { loading: () => <p>Loading...</p> }
);

export default function Product() {
  const router = useRouter();
  const [isAddToCardModalVisible, setIsAddToCardModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCardModalVisible(true);
  }

  return (
    <div>
      <h1>Product {router.query.slug}</h1>

      <button type="button" onClick={handleAddToCart}>Add to cart</button>

      {isAddToCardModalVisible && <AddToCartModal />}
    </div>
  )
}
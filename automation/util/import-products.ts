import productsJson from '../../public/products.json';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
}

export const products: Product[] = productsJson;

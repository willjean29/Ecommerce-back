export interface ProductDto {
  user?: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
}

export interface ReviewDto {
  name: string;
  rating: number;
  comment: string;
  user: string;
}

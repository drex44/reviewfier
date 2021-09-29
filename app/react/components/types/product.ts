export type Product = {
  id: string;
  name: string;
  description: string;
  avgStars: number;
};

export type Rating = {
  id: string;
  tsProductId: string;
  review: string;
  stars: number;
}
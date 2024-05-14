export interface Product {
  id: number,
  title: string,
  discountedPrice: number,
  price: number,
  quantity:number ,
  description: string,
  category: string,
  image: string,
  rating: Rating,
}

interface Rating {
  rate: number,
  count: number
}

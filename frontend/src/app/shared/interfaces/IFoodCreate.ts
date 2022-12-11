export interface IFoodCreate{
    name:string;
    price: number;
    tags: string[];
    favorite: boolean;
    imageUrl: string;
    origins:string[];
    cookTime: string;
  }
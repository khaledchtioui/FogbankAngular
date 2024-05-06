import {User} from "./User";
import {Product} from "./Product";


export interface LostProduct {
  id: number;
  userlp: User;
  productDetail: Product;
}

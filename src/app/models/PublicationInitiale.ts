import {User} from "./User";
import {LikePublication} from "./LikePublication";

export class PublicationInitiale{
  idPublication!:number;
  description!:string;
  datePublication!:Date;
  likePublicationList!:LikePublication[];
  user!:User;
  titre!:string;
}

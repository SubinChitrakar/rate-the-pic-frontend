import {ImageModel} from './imageModel';

export class CommentModel{
  id: number;
  imageId: number;
  userId: number;
  userEmail: string;
  image: ImageModel;
  commentDetails: string;
  rating: number;
  commentDate: Date;
}

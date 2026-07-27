export interface IPost {
  post?: any;
  _id: string;
  title: string;
  author: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}
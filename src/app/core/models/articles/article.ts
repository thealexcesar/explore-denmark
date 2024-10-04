import {BaseEntity} from "@models/base-entity";
import {CategoryType} from "@models/articles/category-type";

export interface Article extends BaseEntity {
  title: string;
  content: string;
  category: CategoryType;
  createdBy: string;
  username: string;
  photoUrl?: string;
}

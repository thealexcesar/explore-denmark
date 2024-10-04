import {BaseEntity} from "@models/base-entity";

export interface Comment extends BaseEntity {
  content: string;
  owner: string;
  ownerEmail: string;
  blogId: number;
  commentId?: number;
}

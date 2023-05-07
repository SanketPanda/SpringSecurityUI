import { auditDTO } from "./audit.model";
import { commentDTO } from "./comment.model";

export interface postDTO extends auditDTO {
  postId: number,
  postDescription: string,
  email: string,
  isPublicPost: boolean,
  commentDTO: Array<commentDTO>,
  usersDTO: any
}

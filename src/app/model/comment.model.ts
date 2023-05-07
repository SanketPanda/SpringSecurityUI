import { auditDTO } from "./audit.model";

export interface commentDTO extends auditDTO {
  commentId: number,
  commentDescription: string,
  postId: number,
  email: string,
  usersDTO: any
}

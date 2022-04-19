import { AnswerModel } from "./answerModel";

export interface QuestionModel {
  id?: number;
  content: string;
  teacherId: number;
  categoryId: number;
  score: number;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  answers?: AnswerModel[]
}

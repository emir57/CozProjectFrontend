import { AnswerModel } from "./answerModel";
import { CategoryModel } from "./categoryModel";
import { User } from "./user";

export interface QuestionModel {
  id?: number;
  content: string;
  teacherId: number;
  user: User;
  categoryId: number;
  category: CategoryModel;
  score: number;
  createdDate?: string;
  updatedDate?: string;
  answers?: AnswerModel[]
  result?: boolean;
}

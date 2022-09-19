import { CategoryModel } from "./categoryModel";
import { QuestionModel } from "./questionModel";

export interface AnswerModel {
  id?: number;
  questionId?: number;
  question?: QuestionModel
  content?: string;
  isTrue?: boolean;
  createdDate?: string;
  updatedDate?: string;
}

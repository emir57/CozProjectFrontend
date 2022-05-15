import { CategoryModel } from "./categoryModel";
import { QuestionModel } from "./questionModel";

export interface AnswerModel {
  id?: number;
  questionId?: number;
  content?: string;
  isTrue?: boolean;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  question?: QuestionModel
}

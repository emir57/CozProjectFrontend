import { QuestionModel } from "./questionModel";

export interface CategoryModel {
  id: number;
  name: string;
  backgroundColor: string;
  textColor: string;
  isComplete?: boolean;
  createdDate: string;
  updatedDate: string;

  questions: QuestionModel[];
}

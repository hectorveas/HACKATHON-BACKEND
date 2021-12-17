import model from './review.schema';
import { Review } from "@models/review.model";


async function getReviews(): Promise<Review[]>{
  return model.find();
}

async function getReview(id: string): Promise<Review | null>{
  return model.findOne({ _id: id });
}

async function addReview(review: Review): Promise<Review>{
  return model.create<Review>(review);
}

async function updateReview(id: string, review: Partial<Review>): Promise<Review | null>{
  return model.findOneAndUpdate({ _id: id }, review);
}

async function deleteReview(id: string): Promise<Review | null>{
  return model.findOneAndRemove({_id: id});
}

async function deleteReviews(ids: string[]): Promise<Review | null>{
  return model.findOneAndRemove({_id: { $in: ids} });
}

export default { getReviews, getReview, addReview, updateReview, deleteReview, deleteReviews };

import repository from "./review.repository";
import { Review } from "@models/review.model";
import propertyController from '../property/property.controller';
import userController from '../user/user.controller';


function getReviews(): Promise<Review[]>{
  return repository.getReviews();
}

function getReview(id: string): Promise<Review | null>{
  return repository.getReview(id);
}

function addReview(review: Review): Promise<Review>{
  return repository.addReview(review);
}

async function addPropertyReview(review: Review, id: string): Promise<Review>{
  const result = await repository.addReview(review);
  let property = await propertyController.getProperty(id);
  if (result._id) (property!.reviews as string[])?.push(result._id!);
  await propertyController.updateProperty(property!._id!,property!);
  return result;
}

async function addUserReview(review: Review, id: string): Promise<Review>{
  const result = await repository.addReview(review);
  await userController.updateReview(id, result._id!);
  return result;
}

function updateReview(id: string, review: Partial<Review>): Promise<Review | null>{
  return repository.updateReview(id, review);
}

function deleteReview(id: string): Promise<Review | null>{
  return repository.deleteReview(id);
}

function deleteReviews(ids: string[]): Promise<Review | null>{
  return repository.deleteReviews(ids);
}

export default { addReview, addPropertyReview, addUserReview, getReviews, getReview, updateReview, deleteReview, deleteReviews };
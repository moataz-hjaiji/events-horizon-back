import IPost, { PostModel } from "../../model/Post";

const findById = async (id: string): Promise<IPost | null> => {
  return await PostModel.findById(id);
};
export default findById;

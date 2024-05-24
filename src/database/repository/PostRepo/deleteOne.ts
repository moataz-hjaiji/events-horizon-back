import IPost, { PostModel } from "../../model/Post";

const deleteOne = async (obj: object): Promise<IPost | null> => {
  return await PostModel.findByIdAndDelete(obj);
};
export default deleteOne;

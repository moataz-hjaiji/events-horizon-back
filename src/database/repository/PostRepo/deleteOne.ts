import IPost, { PostModel } from "../../model/post";


const deleteOne = async (obj:object): Promise<IPost | null>=>{
    return await PostModel.findByIdAndDelete(obj)
}
export default deleteOne;
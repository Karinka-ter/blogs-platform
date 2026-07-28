import {WithId} from "mongodb";
import {Post, PostView} from "../../types/posts-type";

export const mapPostToViewModel = (post: WithId<Post>): PostView=>{
    return {
        id: post._id.toString(),
        title:post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,

    }
}
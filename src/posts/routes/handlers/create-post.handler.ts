import {Request,Response} from "express";
import {PostsInputDto} from "../../dto/posts.input-dto";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {Post} from "../../types/posts-type";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";

export const createPostHandler = async (req: Request<{},{},PostsInputDto>, res: Response) => {
  try{
      const newPost: Post = {
          title: req.body.title,
          shortDescription: req.body.shortDescription,
          content: req.body.content,
          blogId: req.body.blogId,
          blogName: ''
      }
      const post = await postsRepository.createPost(newPost);
      if(post){
          const postView = mapPostToViewModel(post)
          res.status(HttpStatus.Created).send(postView);
          return;
      }
      res.status(HttpStatus.BadRequest).send("Not Found");
  }catch{

  }



}
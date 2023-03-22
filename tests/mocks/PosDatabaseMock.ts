import { LikeDislikePostDB, PostDB, PostWithCreatorDB, POST_LIKE, UserDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";
import { UserDatabase } from "../../src/database/UserDatabase";

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_POSTS = "likes_dislikes_post"

    public getAllPosts = async (): Promise<PostDB[]> => {
        
        return [
            {
                id: "id-mock",
                content: "content-mock-1",
                likes: 1,
                dislikes: 0,
                replies: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock"                
            },
            {
                id: "id-mock",
                content: "content-mock-2",
                likes: 2,
                dislikes: 1,
                replies: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock"
            }
        ]
    }

    public getPostsByContent = async (q: string): Promise<PostDB[]> => {
        
        if(q) {
           return [
                {
                    id: "id-mock",
                    content: "content-mock-1",
                    likes: 1,
                    dislikes: 0,
                    replies: 1,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_id: "id-mock"
                }
            ]

        } else {
            return []
        }
   }

   public getPost = async (q: string | undefined): Promise<PostDB[]> => {
    if(q) {
        return [
             {
                 id: "id-mock",
                 content: "content-mock-1",
                 likes: 1,
                 dislikes: 0,
                 replies: 1,
                 created_at: new Date().toISOString(),
                 updated_at: new Date().toISOString(),
                 creator_id: "id-mock"
             }
         ]

     } else {
         return [
            {
                id: "id-mock",
                content: "content-mock-1",
                likes: 1,
                dislikes: 0,
                replies: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock"
            }
        ]
     }
}


public insert = async (postDB: PostDB): Promise<void> => {
    
}  

public searchPostById = async (id: string): Promise<PostDB | undefined> => {
    if(id === "id-mock") {
        return {
                id: "id-mock",
                content: "content-mock-1",
                likes: 1,
                dislikes: 0,
                replies: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock"
        }        
    } else {
         return undefined
    }
}

public updatePost = async (idToEdit: string, updatedPostDB: PostDB): Promise<void> => {
            
}


public deletePost = async (idToDelete: string): Promise<void> => {
    
}

public getPostWithCreatorById = async (postId: string): Promise<PostWithCreatorDB | undefined> => {
    if(postId === "id-mock") {
        return {
                id: "id-mock",
                creator_id: "id-mock",
                content: "content-mock-1",
                likes: 1,
                dislikes: 0,
                replies: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_nick_name: "Normal Mock"
            }        
        
    } else {
        return undefined
    } 
}


public likeOrDislikePost = async (likeDislikePostDB: LikeDislikePostDB): Promise<void> => {

}

public searchLikeDislike = async (likeDislikePostDBToFind: LikeDislikePostDB): Promise<POST_LIKE | null> => {
    if (likeDislikePostDBToFind.post_id === "id-mock"
    && likeDislikePostDBToFind.user_id === "id-mock") {
        return likeDislikePostDBToFind.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
    } else {
        return null
    }
}

public removeLikeDislike = async (likeDislikePostDB :LikeDislikePostDB): Promise<void> => {
    
}

public updateLikeDislike = async (likeDislikePostDB: LikeDislikePostDB): Promise<void> => {
    
}



}
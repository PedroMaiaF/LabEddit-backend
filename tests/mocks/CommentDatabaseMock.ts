import { BaseDatabase } from "../../src/database/BaseDatabase"
import { GetCommentsOutputDTO } from "../../src/dtos/commentDTO"
import { CommentDB, CommentWithCreatorNameDB, LikeDislikePostCommentDB, PostWithCommentsDB, PostWithCreatorDB, POST_LIKE } from "../../src/types"

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POST_COMMENTS = "post_comments"
    public static TABLE_LIKES_DISLIKES_POST_COMMENT = "likes_dislikes_post_comment"

    public getPostComments = async (postId: string): Promise<GetCommentsOutputDTO[] | undefined> => {
        
        if(postId === "id-mock") {
                    return  [{
                                id: "id-mock",
                                content: "content-mock-1",
                                likes: 2,
                                dislikes: 1,
                                commentCreatedAt: new Date().toISOString(),
                                commentUpdatedAt: new Date().toISOString(),
                                commentCreatorId: "id-mock",
                                postId: "id-mock",
                                commentCreatorNickName: "Normal Mock"
                            },
                            {
                                id: "id-mock",
                                content: "content-mock-2",
                                likes: 3,
                                dislikes: 1,
                                commentCreatedAt: new Date().toISOString(),
                                commentUpdatedAt: new Date().toISOString(),
                                commentCreatorId: "id-mock",
                                postId: "id-mock",
                                commentCreatorNickName: "Normal Mock"
                            }
                        ]  
                    
                } else {
                    return undefined
                } 

    }


    public getPostsWithCreatorAndComments = async (postId: string) => {
        if(postId === "id-mock") {
            return {
                    id: "id-mock",
                    creator_id: "id-mock",
                    content: "content-mock-1",
                    likes: 2,
                    dislikes: 1,
                    replies: 2,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    nick_name: "Normal Mock",
                    comments: [{
                        id: "id-mock",
                        creator_id: "id-mock",
                        nick_name: "Normal Mock",
                        post_id: "id-mock",
                        content: "content-mock-2",
                        likes: 2,
                        dislikes: 1,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                    {
                        id: "id-mock",
                        creator_id: "id-mock",
                        nick_name: "Normal Mock",
                        post_id: "id-mock",
                        content: "content-mock-3",
                        likes: 5,
                        dislikes: 0,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    }
                    ]
                }        
            
        } else {
            return undefined
        } 
    }
        
    public insert = async (commentDB: CommentDB): Promise<void> => {
        
    }

    public searchCommentById = async (id: string): Promise<CommentDB | undefined> => {
        if(id === "id-mock") {
            return {
                    id: "id-mock",
                    content: "content-mock-1",
                    likes: 1,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_id: "id-mock",
                    post_id: "id-mock"
                }        
            
        } else {
            return undefined
        }     
    }
        
    public deleteComment = async (idToDelete: string): Promise<void> => {
        
    }

    public getCommentWithCreator = async (idCommentToLikeOrDislike: string): Promise<CommentWithCreatorNameDB | undefined> => {
        

        if(idCommentToLikeOrDislike === "id-mock") {
            return {
                    id: "id-mock",
                    creator_id: "id-mock",
                    content: "content-mock-1",
                    likes: 1,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    post_id: "id-mock",
                    comment_creator_nick_name: "Normal Mock"
                }        
            
        } else {
            return undefined
        } 
        
    }

    public likeOrDislikeComment = async (likeDislikePostCommentDB: LikeDislikePostCommentDB): Promise<void> => {
      
    }

    public searchLikeDislike = async (likeDislikeDBToFind: LikeDislikePostCommentDB): Promise<POST_LIKE | null> => {
        if (likeDislikeDBToFind.comment_id === "id-mock"
    && likeDislikeDBToFind.user_id === "id-mock") {
        return likeDislikeDBToFind.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
    } else {
        return null
    }
    }

    public removeLikeDislike = async (likeDislikeDB :LikeDislikePostCommentDB): Promise<void> => {
        
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikePostCommentDB): Promise<void> => {
        
    }

    public updateComment = async (idToEdit: string, updatedCommentDB: CommentDB): Promise<void> => {
        
    }


}
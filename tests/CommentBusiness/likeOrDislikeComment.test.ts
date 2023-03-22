import { CommentBusiness } from "../../src/business/CommentBusiness"
import { CreateCommentInputDTO, DeleteCommentInputDTO, GetCommentsInputDTO, LikeOrDislikeCommentInputDTO } from "../../src/dtos/commentDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"



describe("likeOrDislikeComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("deve disparar erro caso token não seja informado", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikeCommentInputDTO = {                
                idCommentToLikeOrDislike: "id-mock",
                token: undefined,
                like: true
            }

            await commentBusiness.likeOrDislikeComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro caso token seja inválido", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikeCommentInputDTO = {
                idCommentToLikeOrDislike: "id-mock",
                token: "token-incorreto",
                like: true
            }

            await commentBusiness.likeOrDislikeComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    
    test("deve disparar erro caso o id não seja encontrado", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikeCommentInputDTO = {
                idCommentToLikeOrDislike: "id-mock-inexistente",
                token: "token-mock-normal",
                like: true
            }

            await commentBusiness.likeOrDislikeComment(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do comment não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar erro caso 'like' não seja ''boolean''", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikeCommentInputDTO = {
                idCommentToLikeOrDislike: "id-mock",
                token: "token-mock-normal",
                like: "true"
            }

            await commentBusiness.likeOrDislikeComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'like' deve ser boolean")
                expect(error.statusCode).toBe(400)
            }
        }
    })    

})
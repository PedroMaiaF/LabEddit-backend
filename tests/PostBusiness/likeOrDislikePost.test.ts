import { PostBusiness } from "../../src/business/PostBusiness"
import { LikeOrDislikePostInputDTO } from "../../src/dtos/postDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("likeOrDislikePost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )


    test("deve disparar erro caso token não seja informado", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikePostInputDTO = {                
                idToLikeOrDislike: "id-mock",
                token: undefined,
                like: true
            }

            await postBusiness.likeOrDislikePost(input)

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

            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: "id-mock",
                token: "token-incorreto",
                like: true
            }

            await postBusiness.likeOrDislikePost(input)

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

            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: "id-mock-inexistente",
                token: "token-mock-normal",
                like: true
            }

            await postBusiness.likeOrDislikePost(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do post não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar erro caso 'like' não seja ''boolean''", async () => {
        
        expect.assertions(2)

        try {

            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: "id-mock",
                token: "token-mock-normal",
                like: "true"
            }

            await postBusiness.likeOrDislikePost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'like' deve ser boolean")
                expect(error.statusCode).toBe(400)
            }
        }
    })    

})
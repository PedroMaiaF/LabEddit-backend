import { CommentBusiness } from "../../src/business/CommentBusiness"
import { CreateCommentInputDTO, GetCommentsInputDTO } from "../../src/dtos/commentDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"



describe("createComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )
    test("criar comentário bem sucedido em conta normal deve retornar mensagem", async () => {
        
        const input: CreateCommentInputDTO = {
            token: "token-mock-normal",
            content: "content-mock-1",
            idToComment: "id-mock"
        }

        const response = await commentBusiness.createComment(input)
        expect(response.message).toBe("Comentário criado com sucesso")


    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input: CreateCommentInputDTO = {
                token: undefined,
                content: "content-mock-1",
                idToComment: "id-mock"
            }

            await commentBusiness.createComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }     

    })

    test("deve disparar erro caso token seja inválido",async () => {
        
        expect.assertions(2)

        try {

            const input: CreateCommentInputDTO = {
                token: "token-mock-inválido",
                content: "content-mock-1",
                idToComment: "id-mock"
            }

            await commentBusiness.createComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }    

    })

    test("deve disparar erro caso content não seja string",async () => {
        
        expect.assertions(2)

        try {

            
            const input: CreateCommentInputDTO = {
                token: "token-mock-normal",
                content: true,
                idToComment: "id-mock"
            }

            await commentBusiness.createComment(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'content' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro caso o id não seja encontrado", async () => {
        
        expect.assertions(2)

        try {

            const input: CreateCommentInputDTO = {
                token: "token-mock-normal",
                content: "content-mock-1",
                idToComment: "id-mock-inexistente"
            }

            await commentBusiness.createComment(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' não encontrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })


})
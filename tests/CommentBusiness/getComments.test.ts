import { CommentBusiness } from "../../src/business/CommentBusiness"
import { CreateCommentInputDTO, DeleteCommentInputDTO, GetCommentsInputDTO } from "../../src/dtos/commentDTO"
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

    test("Delete bem-sucedido em conta normal retorna mensagem.", async () => {
        
        
        const input: DeleteCommentInputDTO = {
            idToDelete: "id-mock",
            token: "token-mock-normal"
        }

        const response = await commentBusiness.deleteComment(input)
        expect(response.message).toBe("Comentário apagado com sucesso")
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input: DeleteCommentInputDTO = {
                token: undefined,
                idToDelete: "id-mock"
            }

            await commentBusiness.deleteComment(input)

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

            const input: DeleteCommentInputDTO = {
                token: "token-mock-inválido",
                idToDelete: "id-mock"
            }

            await commentBusiness.deleteComment(input)

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

            const input: DeleteCommentInputDTO = {
                token: "token-mock-normal",
                idToDelete: "id-mock-inexistente"
            }

            await commentBusiness.deleteComment(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do comment não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })


})
import { UserBusiness } from "../../src/business/UserBusiness"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("getUsers", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar uma lista de Users", async () => {
        const input = {
            q: undefined,
            token: "token-mock-admin"
        }

        const response = await userBusiness.getUsers(input)
        expect(response).toHaveLength(2)
        expect(response).toContainEqual({
            id: "id-mock",
            nickName: "Normal Mock",
            email: "normal@email.com",
            password: "hash-backend",
            role: USER_ROLES.NORMAL,
            createdAt: expect.any(String)
        })
    })

    test("deve disparar erro caso token não seja uma informado",async () => {
        
        expect.assertions(2)

        try {

            const input = {
                q: undefined,
                token: undefined
            }

            await userBusiness.getUsers(input)

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

            const input = {
                q: undefined,
                token: null
            }

            await userBusiness.getUsers(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }    

    })

    test("deve disparar erro caso token não seja de um administrador",async () => {
        
        expect.assertions(2)

        try {

            const input = {
                q: undefined,
                token: "token-mock-normal"
            }

            await userBusiness.getUsers(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("Somente o administrador de sistema pode acessar esse recurso.")
                expect(error.statusCode).toBe(400)
            }
        }       
        
        

    })

})
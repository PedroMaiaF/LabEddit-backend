import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginInputDTO } from "../../src/dtos/UserDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("login bem-sucedido em conta normal retorna token", async () => {
        const input = {
            email: "normal@email.com",
            password: "B@ckEnd1"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")      
    })

    test("login bem-sucedido em conta admin retorna token", async () => {
        const input: LoginInputDTO = {
            email: "admin@email.com",
            password: "B@ckEnd1"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })

    test("deve disparar um erro caso o email não seja uma string", async () => {
        
        expect.assertions(2)

        try {

            const input: LoginInputDTO = {
                email: null,
                password: "B@ckEnd1" 
            }

            await userBusiness.login(input)
            
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'email' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar um erro caso a senha não seja uma string", async () => {
        
        expect.assertions(2)

        try {

            const input: LoginInputDTO = {
                email: "example@email.com",
                password: null
            }

            await userBusiness.login(input)
            
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'password' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar um erro caso o email não seja encontrado no banco de dados", async () => {
        
        expect.assertions(2)

        try {

            const input: LoginInputDTO = {
                email: "unknown@email.com",
                password: "B@ckEnd1" 
            }

            await userBusiness.login(input)
            
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'email' não cadastrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar um erro caso o password esteja incorreto", async () => {
        expect.assertions(2)

        try {

            const input: LoginInputDTO = {
                email: "normal@email.com",
                password: "Pokemon$" 
            }

            await userBusiness.login(input)
            
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'password' incorreto")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})
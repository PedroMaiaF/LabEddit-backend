import { UserBusiness } from "../../src/business/UserBusiness"
import { CreateUserInputDTO, LoginInputDTO } from "../../src/dtos/UserDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { ConflictError } from "../../src/errors/Conflict"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("createUser", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )


    test("cadastro bem-sucedido retorna token", async () => {
        const input: CreateUserInputDTO = {
            nickName: "Example Mock",
            email: "example@email.com",
            password: "Back3nd$"
        }

        const response = await userBusiness.createUser(input)
        expect(response.token).toBe("token-mock-normal")
        expect(response.message).toBe("Usuário criado com sucesso")
    })

    test("deve disparar erro caso nickName não seja uma string", async () => {
        expect.assertions(2)

        try {
            const input: CreateUserInputDTO = {
                email: "example@email.com",
                nickName: null,
                password: "Back3nd$"
            }

            await userBusiness.createUser(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'nickName' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }        
    })

    test("deve disparar erro caso email não seja uma string", async () => {
        expect.assertions(2)

        try {
            const input: CreateUserInputDTO = {
                email: null,
                nickName: "Example Mock",
                password: "Back3nd$"
            }

            await userBusiness.createUser(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'email' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }        
    })

    test("deve disparar erro caso password não seja uma string", async () => {
        expect.assertions(2)

        try {

            const input: CreateUserInputDTO = {
                email: "normal@email.com",
                nickName: "Example Mock",
                password: null
            }

            await userBusiness.createUser(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'password' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }        
    })

    test("deve disparar erro caso email fornecido já tenha sido cadastrado", async () => {
        expect.assertions(2)

        const input: CreateUserInputDTO = {
            email: "normal@email.com",
            nickName: "Example Mock",
            password: "Back3nd$"
        }
        
        expect(async () => {
            await userBusiness.createUser(input)
        }).rejects.toThrow("'email' já cadastrado.")

        expect(async () => {
            await userBusiness.createUser(input)
        }).rejects.toBeInstanceOf(ConflictError)

    })

    test("deve disparar erro caso email fornecido não seja de um domínio válido", async () => {
        expect.assertions(1)

        const input: CreateUserInputDTO = {
            email: "normalemail.gov.eu",
            nickName: "Example Mock",
            password: "Back3nd$"
        }
        
        // expect(async () => {
        //     await userBusiness.createUser(input)
        // }).rejects.toThrow("'email' deve ser de um domínio válido")

        expect(async () => {
            await userBusiness.createUser(input)
        }).rejects.toBeInstanceOf(BadRequestError)

    })

    test("deve disparar erro caso senha não possua entre 6 e 20 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial", async () => {
        expect.assertions(2)

        const input: CreateUserInputDTO = {
            email: "normal@email.com",
            nickName: "Example Mock",
            password: "Backend"
        }
        
        expect(async () => {
            await userBusiness.createUser(input)
        }).rejects.toThrow("'password' deve possuir entre 6 e 20 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")

        expect(async () => {
            await userBusiness.createUser(input)
        }).rejects.toBeInstanceOf(BadRequestError)

    })
    
})
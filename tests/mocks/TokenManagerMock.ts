import { TokenPayLoad, USER_ROLES } from "../../src/types"

export class TokenManagerMock {

    public createToken = (payload: TokenPayLoad): string => {
        if (payload.role == USER_ROLES.NORMAL) {
            return "token-mock-normal"
        } else {
            return "token-mock-admin"
        }
    }

    public getPayload = (token: string): TokenPayLoad | null => {
        if (token == "token-mock-normal") {
            return {
                id: "id-mock",
                nickName: "Normal Mock",
                role: USER_ROLES.NORMAL
            }

        } else if (token == "token-mock-admin") {
            return {
                id: "id-mock",
                nickName: "Admin Mock",
                role: USER_ROLES.ADMIN
            }

        } else {
            return null
        }
    }
}
import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB, USER_ROLES } from "../../src/types"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(q: string | undefined): Promise<UserDB[]> {
        if(q) {           
            return [
                    {
                        id: "id-mock",
                        nick_name: "Normal Mock",
                        email: "normal@email.com",
                        password: "hash-backend",
                        role: USER_ROLES.NORMAL,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: "id-mock",
                        nick_name: "Admin Mock",
                        email: "admin@email.com",
                        password: "hash-backend",
                        role: USER_ROLES.ADMIN,
                        created_at: new Date().toISOString()
                    }
            ]        
        } else {
             return [
                {
                    id: "id-mock",
                    nick_name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                },
                {
                    id: "id-mock",
                    nick_name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            ]
        }
    }
    
    public async findUserById(id: string): Promise<UserDB | undefined> {
        switch (id) {
            case "id-mock-normal":
                return {
                    id: "id-mock-normal",
                    nick_name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                }
            case "id-mock-admin":
                return {
                    id: "id-mock-admin",
                    nick_name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }
    
    public searchByEmail = async (email: string): Promise<UserDB | undefined>  => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    nick_name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    nick_name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-backend",
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }

    public insertUser = async (userDB: UserDB): Promise<void> => {
    }
}
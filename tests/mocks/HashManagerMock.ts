export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "Back3nd$") {
            return "hash-backend"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "Back3nd$" && hash == "hash-backend") {
            return true
        }

        return false
    }
}
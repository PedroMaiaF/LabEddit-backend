export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "B@ckEnd1") {
            return "hash-backend"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "B@ckEnd1" && hash == "hash-backend") {
            return true
        }

        return false
    }
}
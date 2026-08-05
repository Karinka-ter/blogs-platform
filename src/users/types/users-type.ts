export type User = {
    login: string
    email: string
    passwordHash: string
    createdAt: string
}

export type UserInputDtoType = {
    login: string,
    password: string,
    email: string
}

export type UserViewModel = {
    id: string
    login: string
    email: string
    createdAt: string
}

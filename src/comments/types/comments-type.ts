export type CommentType = {
    content: string,
    commentatorInfo: {
    userId: string,
        "userLogin": string
},
    "createdAt": string,
}

export type CommentTypeViewModel = {
    id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        "userLogin": string
    },
    "createdAt": string,
}


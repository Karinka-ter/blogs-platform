export type Post ={
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}

export type PostInputDto = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type PostView = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,

}
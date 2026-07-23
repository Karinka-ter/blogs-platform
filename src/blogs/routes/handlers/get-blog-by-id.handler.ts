import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/middlewares/validator/input-validation-result.middleware";
import {mapToBlogsViewModel} from "../mappers/map-to-blogs-view-model";

export const getBlogByIdHandler = async(req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const blog = await blogsRepository.findById(req.params.id)
        if (blog) {
            const blogViewModel = mapToBlogsViewModel(blog);
            res.status(HttpStatus.Ok).send(blogViewModel)
            return;
        }
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "Blog not found."}]));
    }catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }


}


//
// export async function getDriverHandler(
//     req: Request<{ id: string }>,
//     res: Response,
// ) {
//     try {
//         const id = req.params.id;
//         const driver = await driversRepository.findById(id);
//
//         if (!driver) {
//             res
//                 .status(HttpStatus.NotFound)
//                 .send(
//                     createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
//                 );
//
//             return;
//         }
//
//         const driverViewModel = mapToDriverViewModel(driver);
//         res.status(HttpStatus.Ok).send(driverViewModel);
//     } catch {
//         res.sendStatus(HttpStatus.InternalServerError);
//     }
// }
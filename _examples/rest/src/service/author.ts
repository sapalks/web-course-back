import { getManager } from "typeorm";
import { Author } from "../entity";
import { NotFoundError } from "../error";
import { catchOrmErrors } from "./utils";


export class AuthorService {
    public static async add(name: string, born: number, died?: number): Promise<Author> {
        const rep = getManager().getRepository(Author);
        return catchOrmErrors(async () => {
            return await rep.save({ name, born, died });
        });
    }

    public static async edit(id: string, data: { name?: string, born?: number, died?: number }): Promise<Author> {
        const rep = getManager().getRepository(Author);
        let author = await rep.findOne(id);
        if (!author) throw new NotFoundError('author');
        const { name, born, died } = data;
        author = {
            ...author,
            ...name && { name },
            ...born && { born },
            ...died && { died },
        }
        return await rep.save(author);
    }

    public static async get(...ids: string[]): Promise<Author[]> {
        const rep = getManager().getRepository(Author);
        if (ids.length === 0)
            return await rep.find({ take: 10 });
        return await rep.findByIds(ids, { take: 10 });
    }
}
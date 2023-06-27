import { REQUEST_STATUS, User } from "@prisma/client";

export class Request {
    readonly id: string;

    readonly message: string;
    readonly comment?: string;
    readonly status: REQUEST_STATUS;

    readonly authorId: string;
    readonly author: User;

    readonly moderatorId?: string;
    readonly moderator?: User;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}

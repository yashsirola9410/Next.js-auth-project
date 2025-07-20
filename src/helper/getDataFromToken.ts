import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request : NextRequest) =>{
    try {
        const token = request.cookies.get("token")?.value || '';
        const secret = process.env.TOKEN_SECRET;
        if (!secret) throw new Error("TOKEN_SECRET is not defined");
        interface DecodedToken {
            id: string;
            [key: string]: unknown;
        }
        const decodedToken = jwt.verify(token, secret) as DecodedToken;
        return decodedToken.id;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}
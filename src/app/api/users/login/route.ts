import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect()

export async function POST(request : NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email , password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password , user.password)
        if(!validPassword){
            return NextResponse.json({error : "Invalid password"} , {status : 400})
        }

        console.log(user);

        const  tokenData = {
            id : user._id,
            username : user.username ,
            email:user.email
        }

        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET environment variable is not defined");
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn : "1d"});

        const response = NextResponse.json({
            message : "Login successfull",
            success :  true ,
        })

        response.cookies.set("token" , token , {
            httpOnly : true ,
        })

        return response ;

    } catch (error : unknown) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message} , {status : 500})
        }
        return NextResponse.json({error : "An unknown error occurred"} , {status : 500})
    }
}
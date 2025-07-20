import { getDataFromToken } from "@/helper/getDataFromToken"; 
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();

        const userId = getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
}

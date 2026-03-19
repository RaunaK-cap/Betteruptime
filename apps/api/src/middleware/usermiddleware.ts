import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

export const middleware = async(req:Request , res:Response , next:NextFunction)=>{
        const token = req.headers.authorization
        if(!token){
            res.json({
                message:"Enter token"
            })
        }
        const verified = jwt.verify(token! , process.env.JWT_SECRET!)
        if(verified){
            //@ts-ignore
            req.userID = verified
            next()
        }else{
            res.json({
                message:"unauthorized..."
            })
        }
}
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";


@Injectable()
export class GoogleGuard extends AuthGuard("google"){}
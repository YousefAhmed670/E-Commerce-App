import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserMongoModule } from "./user-mongo.module";

@Global()
@Module({
    imports:[UserMongoModule],
    controllers:[],
    providers:[JwtService],
    exports:[JwtService,UserMongoModule],
})
export class CommonModule {}
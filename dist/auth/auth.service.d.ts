import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    createUser(email: string, password: string, name: string, role?: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}

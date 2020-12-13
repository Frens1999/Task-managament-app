import { UserRepository } from './user.repository';
import { JwtPayload } from './jtw-payload.inteface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<import("./user.entity").User>;
}
export {};

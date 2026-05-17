import { CreateDriverDto } from './create-driver.dto';
import { DriverStatus } from '../schemas/driver.schema';
declare const UpdateDriverDto_base: import("@nestjs/common").Type<Partial<CreateDriverDto>>;
export declare class UpdateDriverDto extends UpdateDriverDto_base {
    status?: DriverStatus;
    rating?: number;
}
export {};

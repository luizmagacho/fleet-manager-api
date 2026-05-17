import { HistoryService } from './history.service';
import { EventType } from './schemas/history-event.schema';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    findAll(page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/history-event.schema").HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/history-event.schema").HistoryEvent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByVehicle(vehicleId: string, page: number, limit: number, type?: EventType): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/history-event.schema").HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/history-event.schema").HistoryEvent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByDriver(driverId: string, page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/history-event.schema").HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/history-event.schema").HistoryEvent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}

import { Model, Types } from 'mongoose';
import { HistoryEvent, HistoryEventDocument, EventType, EventSource } from './schemas/history-event.schema';
export interface RecordEventDto {
    vehicleId: string;
    driverId?: string;
    type: EventType;
    source?: EventSource;
    title: string;
    description: string;
    metadata?: Record<string, any>;
    createdBy?: string;
}
export declare class HistoryService {
    private historyEventModel;
    constructor(historyEventModel: Model<HistoryEventDocument>);
    record(dto: RecordEventDto): Promise<HistoryEvent>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & HistoryEvent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByVehicle(vehicleId: string, page?: number, limit?: number, type?: EventType): Promise<{
        data: (import("mongoose").Document<unknown, {}, HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & HistoryEvent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByDriver(driverId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, HistoryEventDocument, {}, import("mongoose").DefaultSchemaOptions> & HistoryEvent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
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

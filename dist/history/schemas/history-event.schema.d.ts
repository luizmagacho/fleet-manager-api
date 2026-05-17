import { Document, Types } from 'mongoose';
export type HistoryEventDocument = HistoryEvent & Document;
export declare enum EventSource {
    USER = "USER",
    SYSTEM = "SYSTEM",
    DETRAN_PR = "DETRAN_PR"
}
export declare enum EventType {
    RENTAL_STARTED = "RENTAL_STARTED",
    RENTAL_ENDED = "RENTAL_ENDED",
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
    PAYMENT_OVERDUE = "PAYMENT_OVERDUE",
    MAINTENANCE_SCHEDULED = "MAINTENANCE_SCHEDULED",
    MAINTENANCE_COMPLETED = "MAINTENANCE_COMPLETED",
    FINE_DETECTED = "FINE_DETECTED",
    FINE_PAID = "FINE_PAID",
    IPVA_DUE = "IPVA_DUE",
    IPVA_PAID = "IPVA_PAID",
    LICENSING_DUE = "LICENSING_DUE",
    LICENSING_COMPLETED = "LICENSING_COMPLETED",
    STATUS_CHANGED = "STATUS_CHANGED",
    DOCUMENT_UPDATED = "DOCUMENT_UPDATED",
    NOTE_ADDED = "NOTE_ADDED"
}
export declare class HistoryEvent {
    vehicleId: Types.ObjectId;
    driverId: Types.ObjectId;
    type: EventType;
    source: EventSource;
    title: string;
    description: string;
    metadata: Record<string, any>;
    occurredAt: Date;
    createdBy: string;
}
export declare const HistoryEventSchema: import("mongoose").Schema<HistoryEvent, import("mongoose").Model<HistoryEvent, any, any, any, any, any, HistoryEvent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HistoryEvent, Document<unknown, {}, HistoryEvent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    vehicleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    driverId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    type?: import("mongoose").SchemaDefinitionProperty<EventType, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    source?: import("mongoose").SchemaDefinitionProperty<EventSource, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    title?: import("mongoose").SchemaDefinitionProperty<string, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    metadata?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    occurredAt?: import("mongoose").SchemaDefinitionProperty<Date, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdBy?: import("mongoose").SchemaDefinitionProperty<string, HistoryEvent, Document<unknown, {}, HistoryEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HistoryEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, HistoryEvent>;

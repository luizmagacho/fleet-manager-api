import { Document, Types } from 'mongoose';
export type MaintenanceDocument = Maintenance & Document;
export declare enum MaintenanceType {
    PREVENTIVE = "PREVENTIVE",
    CORRECTIVE = "CORRECTIVE",
    INSPECTION = "INSPECTION"
}
export declare enum MaintenanceStatus {
    SCHEDULED = "SCHEDULED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class Maintenance {
    vehicleId: Types.ObjectId;
    type: MaintenanceType;
    status: MaintenanceStatus;
    scheduledDate: Date;
    completedDate: Date;
    description: string;
    workshopName: string;
    workshopPhone: string;
    services: string[];
    parts: string[];
    cost: number;
    mileageAtService: number;
    nextServiceMileage: number;
    nextServiceDate: Date;
    receiptPath: string;
    notes: string;
}
export declare const MaintenanceSchema: import("mongoose").Schema<Maintenance, import("mongoose").Model<Maintenance, any, any, any, any, any, Maintenance>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Maintenance, Document<unknown, {}, Maintenance, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    vehicleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    type?: import("mongoose").SchemaDefinitionProperty<MaintenanceType, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<MaintenanceStatus, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    scheduledDate?: import("mongoose").SchemaDefinitionProperty<Date, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    completedDate?: import("mongoose").SchemaDefinitionProperty<Date, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    workshopName?: import("mongoose").SchemaDefinitionProperty<string, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    workshopPhone?: import("mongoose").SchemaDefinitionProperty<string, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    services?: import("mongoose").SchemaDefinitionProperty<string[], Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parts?: import("mongoose").SchemaDefinitionProperty<string[], Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cost?: import("mongoose").SchemaDefinitionProperty<number, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mileageAtService?: import("mongoose").SchemaDefinitionProperty<number, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    nextServiceMileage?: import("mongoose").SchemaDefinitionProperty<number, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    nextServiceDate?: import("mongoose").SchemaDefinitionProperty<Date, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    receiptPath?: import("mongoose").SchemaDefinitionProperty<string, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Maintenance, Document<unknown, {}, Maintenance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Maintenance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Maintenance>;

import { Document, Types } from 'mongoose';
export type VehicleDocument = Vehicle & Document;
export declare enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    RENTED = "RENTED",
    MAINTENANCE = "MAINTENANCE",
    INACTIVE = "INACTIVE"
}
export declare enum FuelType {
    FLEX = "FLEX",
    GASOLINE = "GASOLINE",
    ETHANOL = "ETHANOL",
    DIESEL = "DIESEL",
    ELECTRIC = "ELECTRIC",
    HYBRID = "HYBRID"
}
export declare enum TransmissionType {
    MANUAL = "MANUAL",
    AUTOMATIC = "AUTOMATIC",
    CVT = "CVT"
}
export declare class Vehicle {
    licensePlate: string;
    brand: string;
    model: string;
    year: number;
    modelYear: number;
    color: string;
    renavam: string;
    chassis: string;
    fuelType: FuelType;
    transmission: TransmissionType;
    mileage: number;
    status: VehicleStatus;
    currentDriverId: Types.ObjectId;
    photos: string[];
    crlvDocument: string;
    insuranceDocument: string;
    insuranceExpiration: Date;
    ipvaDueDate: Date;
    licensingDueDate: Date;
    nextMaintenanceDate: Date;
    nextMaintenanceMileage: number;
    purchaseValue: number;
    currentValue: number;
    notes: string;
}
export declare const VehicleSchema: import("mongoose").Schema<Vehicle, import("mongoose").Model<Vehicle, any, any, any, any, any, Vehicle>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vehicle, Document<unknown, {}, Vehicle, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    licensePlate?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    brand?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    model?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    year?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    modelYear?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    color?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    renavam?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    chassis?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fuelType?: import("mongoose").SchemaDefinitionProperty<FuelType, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    transmission?: import("mongoose").SchemaDefinitionProperty<TransmissionType, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mileage?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<VehicleStatus, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentDriverId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    photos?: import("mongoose").SchemaDefinitionProperty<string[], Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    crlvDocument?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    insuranceDocument?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    insuranceExpiration?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    ipvaDueDate?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    licensingDueDate?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    nextMaintenanceDate?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    nextMaintenanceMileage?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    purchaseValue?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentValue?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Vehicle>;

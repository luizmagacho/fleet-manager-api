import { Document } from 'mongoose';
export type DriverDocument = Driver & Document;
export declare enum DriverStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare enum LicenseCategory {
    A = "A",
    B = "B",
    AB = "AB",
    C = "C",
    D = "D",
    E = "E"
}
export declare class Driver {
    name: string;
    cpf: string;
    licenseNumber: string;
    licenseCategory: LicenseCategory;
    licenseExpiration: Date;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    profilePhoto: string;
    licenseDocument: string;
    status: DriverStatus;
    rating: number;
    notes: string;
    platforms: string[];
}
export declare const DriverSchema: import("mongoose").Schema<Driver, import("mongoose").Model<Driver, any, any, any, any, any, Driver>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Driver, Document<unknown, {}, Driver, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cpf?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    licenseNumber?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    licenseCategory?: import("mongoose").SchemaDefinitionProperty<LicenseCategory, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    licenseExpiration?: import("mongoose").SchemaDefinitionProperty<Date, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    city?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    zipCode?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    profilePhoto?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    licenseDocument?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<DriverStatus, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    rating?: import("mongoose").SchemaDefinitionProperty<number, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    platforms?: import("mongoose").SchemaDefinitionProperty<string[], Driver, Document<unknown, {}, Driver, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Driver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Driver>;

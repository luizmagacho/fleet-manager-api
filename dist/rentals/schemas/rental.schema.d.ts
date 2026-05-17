import { Document, Types } from 'mongoose';
export type RentalDocument = Rental & Document;
export declare enum RentalStatus {
    ACTIVE = "ACTIVE",
    OVERDUE = "OVERDUE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum PaymentFrequency {
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED"
}
export declare class Payment {
    dueDate: Date;
    paidAt: Date;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
    receiptPath: string;
    notes: string;
}
export declare class Rental {
    vehicleId: Types.ObjectId;
    driverId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    expectedEndDate: Date;
    rentalAmount: number;
    paymentFrequency: PaymentFrequency;
    status: RentalStatus;
    payments: Payment[];
    securityDeposit: number;
    contractPath: string;
    notes: string;
}
export declare const RentalSchema: import("mongoose").Schema<Rental, import("mongoose").Model<Rental, any, any, any, any, any, Rental>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rental, Document<unknown, {}, Rental, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    vehicleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    driverId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    expectedEndDate?: import("mongoose").SchemaDefinitionProperty<Date, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    rentalAmount?: import("mongoose").SchemaDefinitionProperty<number, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentFrequency?: import("mongoose").SchemaDefinitionProperty<PaymentFrequency, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<RentalStatus, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    payments?: import("mongoose").SchemaDefinitionProperty<Payment[], Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    securityDeposit?: import("mongoose").SchemaDefinitionProperty<number, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    contractPath?: import("mongoose").SchemaDefinitionProperty<string, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Rental, Document<unknown, {}, Rental, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rental & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Rental>;

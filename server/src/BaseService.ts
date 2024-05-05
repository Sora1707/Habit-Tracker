import { FilterQuery, Model, Types } from "mongoose";
import ClassDef from "./types/ClassDef";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

type ObjectId = Types.ObjectId;

export abstract class BaseService<T> {
    public model: Model<T>;
    protected classDef: ClassDef;

    public async findById(id: string) {
        const result = await this.model.findById(id);
        return result;
    }

    public async findOne(filter: FilterQuery<T>) {
        const result = await this.model.findOne(filter);
        return result;
    }

    public async findMany(filter: FilterQuery<T>) {
        const result = await this.model.find(filter);
        return result;
    }

    public async create(input: Partial<T>) {
        const result = await this.model.create(input);
        return result;
    }

    public async remove(filter: Partial<T> & { id: ObjectId }) {
        const result = await this.model.deleteMany(filter);
        return result;
    }

    public async updateMany(filter: FilterQuery<T>, input: Partial<T>) {
        const result = await this.model.updateMany(filter, input);
        return result;
    }

    public async updateById(id: string, input: Partial<T>) {
        const result = await this.model.updateOne({ _id: id }, input);
        return result;
    }
}

export function createBaseService(classDef: ClassDef) {
    @Injectable()
    class GeneratedBaseService extends BaseService<any> {
        constructor(@InjectModel(classDef.name) public model: Model<any>) {
            super();
            this.classDef = classDef;
        }
    }
    return GeneratedBaseService as any;
}

export function getBaseServiceToken(classDef: ClassDef | { name: string }) {
    return `Base service: ${classDef.name}`;
}

export function InjectBaseService(classDef: ClassDef | { name: string }) {
    return Inject(getBaseServiceToken(classDef));
}

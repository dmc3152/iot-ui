import { DataSchema } from './data-schema';

export class DataPath {
    schema: DataSchema;
    path: Array<string>;

    constructor(data?: any) {
        this.schema = data.schema;
        this.path = data.path;
    }
}

import { DeviceData } from './device-data';
import { DataSchema } from './data-schema';

export class Device {
    id: string;
    guid: string;
    name: string;
    data: Array<DeviceData>;
    schema: Array<DataSchema>;
    structure: any;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.guid = data.guid;
        this.name = data.name;
        this.data = data.data;
        this.schema = Array.isArray(data.schema) ? data.schema.map(child => this.formatChildSchemas(child, 0)) : [];
        this.structure = data.structure;
    }

    private formatChildSchemas(child, level) {
        return new DataSchema(child, level);
    }
}

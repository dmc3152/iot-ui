export class DataSchema {
    id: string;
    key: string;
    name: string;
    unit: string;
    type: string;
    level: number;
    schema: Array<DataSchema>;
    structure: any;

    constructor(data?, level?) {
        data = data || {};
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;
        this.unit = data.unit;
        this.type = data.type;
        this.level = level || 0;
        this.schema = Array.isArray(data.schema) ? data.schema.map(child => this.formatChildSchemas(child, this.level + 1)) : [];
        this.structure = data.structure;
    }

    private formatChildSchemas(child, level) {
        return new DataSchema(child, level);
    }
}

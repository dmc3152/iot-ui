export class DataSchema {
    id: string;
    key: string;
    name: string;
    unit: string;
    schema: Array<DataSchema>;
    structure: any;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;
        this.unit = data.unit;
        this.schema = Array.isArray(data.schema) ? data.schema.map(this.formatChildSchemas) : [];
        this.structure = data.structure;
    }

    private formatChildSchemas(child) {
        console.log('child', child);
        return new DataSchema(child);
    }
}

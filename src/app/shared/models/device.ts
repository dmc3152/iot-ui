import { DeviceData } from './device-data';
import { DataSchema } from './data-schema';

export class Device {
    guid: string;
    name: string;
    data: Array<DeviceData>;
    schema: Array<DataSchema>;
    structure: any;
}

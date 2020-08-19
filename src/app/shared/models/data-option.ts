export class DataOption {
    text: string;
    value: any;

    constructor(data?: any) {
        this.text = data.text;
        this.value = data.value;
    }
}

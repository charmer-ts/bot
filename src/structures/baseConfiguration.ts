export default class BaseConfiguration {
    public getValue(key: string): any {
        return this[key];
    }

    public setValue(key: string, value: any): void {
        this[key] = value;
    }

    public hasValue(key: string): boolean {
        return this[key] !== undefined;
    }

    public deleteValue(key: string): void {
        delete this[key];
    }
}

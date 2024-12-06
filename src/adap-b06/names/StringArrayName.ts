import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        this.components = other;
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public toString(): string {
        return super.toString();
    }

    public asDataString(): string {
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public doGetComponent(i: number): string {
        return this.components[i];
    }
    public doSetComponent(i: number, c: string) {
        this.components[i] = c;
    }

    public doInsert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    public doAppend(c: string) {
        this.components.push(c);
    }

    public doRemove(i: number) {
        this.components.splice(i,1);
    }

    public concat(other: Name): void {
        super.concat(other);
    }

    protected assertClassInvarinats(): void{
        super.assertClassInvarinats();

        if(this.getNoComponents() !== this.components.length){
            throw new InvalidStateException("Number of components is not equal to components.length");
        }
    }
}
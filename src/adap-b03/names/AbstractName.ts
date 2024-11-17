import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter){
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let str = "";
        for(let i= 0; i < this.getNoComponents(); i++){
            str += this.getComponent(i);

            if(i != this.getNoComponents() -1){
                str += delimiter;
            }
        }
        return str;
    }

    public toString(): string {
        return this.asString(DEFAULT_DELIMITER);
    }

    public asDataString(): string {
        let dstr = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            let component = this.getComponent(i);
            
            let maskedComponent = component
                .replace(new RegExp(`\\${ESCAPE_CHARACTER}`, 'g'), ESCAPE_CHARACTER + ESCAPE_CHARACTER) //Escape Chars werden escapet
                .replace(new RegExp(`\\${this.delimiter}`, 'g'), ESCAPE_CHARACTER + this.delimiter); //Delimiter, die keine Delimiter sind, werden escapet
            
                dstr += maskedComponent;
            
            if (i < this.getNoComponents() - 1) {
                dstr += this.delimiter;
            }
        }
        return dstr;
    }

    public isEqual(other: Name): boolean {
        return this.getHashCode() == other.getHashCode();
    }

    public getHashCode(): number {
        let hashCode = 0;
        let s = this.asDataString();

        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return { ...this };
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
    }

}
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if(delimiter){
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        for (let comp of this.components){
            result += comp;
            result += delimiter;
        }
        result = result.slice(0,-1); //Entfernt den letzten Punkt
        return result;
    }

    public asDataString(): string {
        let result = "";
        for (let comp of this.components){
            result += comp;
            result += DEFAULT_DELIMITER;
        }
        result = result.slice(0,-1); //Entfernt den letzten Punkt
        return result;
    }

    public isEmpty(): boolean {
        return (this.components.length <= 0);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public append(c: string): void { 
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i,1);
    }

    public concat(other: Name): void {
        let numComps = other.getNoComponents();
        let i = 0;
        while(i < numComps){
            let newC = other.getComponent(i);
            this.append(newC);
        }
    }

}
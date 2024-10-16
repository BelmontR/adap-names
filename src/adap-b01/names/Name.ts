export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    //Kontruktor
    constructor(other: string[], delimiter?: string) {

        this.components = other;

        if (delimiter){
            this.delimiter = delimiter;
        }
    }

    
    public asNameString(delimiter: string = this.delimiter): string {
        let result = "";
        for (let comp of this.components){
            result += comp;
            result += delimiter;
        }
        result = result.slice(0,-1); //Entfernt den letzten Punkt
        return result;
    }

    //Getter
    public getComponent(i: number): string {
        return this.components[i]; 
    }

    //Setter
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    //Getter
    public getNoComponents(): number {
        return this.components.length;
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

}
export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    //@methodtype contructor
    constructor(other: string[], delimiter?: string) {

        this.components = other;

        if (delimiter){
            this.delimiter = delimiter;
        }
    }

    //@methodtype conversion method
    public asNameString(delimiter: string = this.delimiter): string {
        let result = "";
        for (let comp of this.components){
            result += comp;
            result += delimiter;
        }
        result = result.slice(0,-1); //Entfernt den letzten Punkt
        return result;
    }

    //@methodtype get-method
    public getComponent(i: number): string {
        return this.components[i]; 
    }

    //@methodtype set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    //@methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    //@methodtype command-method
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    //@methodtype command-method
    public append(c: string): void { 
        this.components.push(c);
    }

    //@methodtype remove-command-method
    public remove(i: number): void {
        this.components.splice(i,1);
    }

}
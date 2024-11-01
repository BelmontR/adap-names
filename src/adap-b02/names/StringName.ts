import { N } from "vitest/dist/chunks/reporters.C4ZHgdxQ";
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        if(delimiter){
            this.delimiter = delimiter;
        }

        this.length = 1;
        let escapeFlag = false;
        for(let i = 0; i < other.length; i++){
            if(!escapeFlag && other[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && other[i] == delimiter){
                this.length ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }
            
        }
        //throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        let newName = this.name.replace(this.delimiter, delimiter);
        return newName;
        //throw new Error("needs implementation");
    }

    public asDataString(): string {

        let dataString = "";
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
                dataString += ESCAPE_CHARACTER;
                dataString += ESCAPE_CHARACTER;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                dataString += DEFAULT_DELIMITER;
            }
            else if(escapeFlag && this.name[i] == this.delimiter){
                escapeFlag = false;
                dataString += this.name[i];
            }
            else{
                dataString += this.name[i];
            }
        }

        return dataString;
    }   

    public isEmpty(): boolean {
        return (this.name == "");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {       
        this.length = 1;
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){
            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                this.length ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }
        }

        return this.length;
    }

    public getComponent(x: number): string {
        let counter = 0;
        let returnString = "";
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                counter ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }

            if(counter == x){
                returnString += this.name[i];
            }

            if(counter > x){
                return returnString;
            }
        }

        return returnString;
    }

    public setComponent(n: number, c: string): void {

        let counter = 0;
        let prefix = "";
        let suffix = "";
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                counter ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }

            if(counter < n){
                prefix += this.name[i];
            }
            else if(counter > n){
                suffix += this.name[i];
            }
        }

        this.name = prefix + this.delimiter + c + suffix;
    }

    public insert(n: number, c: string): void {
        let counter = 0;
        let prefix = "";
        let suffix = "";
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                counter ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }

            if(counter < n){
                prefix += this.name[i];
            }
            else if(counter >= n){
                suffix += this.name[i];
            }
        }

        this.name = prefix + this.delimiter + c + suffix;
    }

    public append(c: string): void {
        this.name += this.delimiter + c;
        this.length ++;
    }

    public remove(n: number): void {
        let counter = 0;
        let prefix = "";
        let suffix = "";
        let escapeFlag = false;

        let deleteLastChar = (n == (this.getNoComponents() -1));

        for(let i = 0; i < this.name.length; i++){

            if(counter < n){
                prefix += this.name[i];
            }
            else if(counter > n){
                suffix += this.name[i];
            }

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                counter ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }
        }

        this.name = prefix + suffix;

        if(deleteLastChar){
            this.name = this.name.substring(0, this.name.length - 1);
        }
    }

    public concat(other: Name): void {
        this.name += this.delimiter + other.asString(this.delimiter);
        this.length += other.getNoComponents();
    }

}
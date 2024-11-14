import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super();

        this.name = other;

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


    public getNoComponents(): number {       
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
        this.length ++;
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

        this.length --;
    }

    public clone(): Name{
        super.clone();
        let clone = new StringName(this.name, this.delimiter);
        return clone;
    }
}
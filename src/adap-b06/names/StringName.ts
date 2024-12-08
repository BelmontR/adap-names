import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other;

        this.noComponents = 1;
        let escapeFlag = false;
        for(let i = 0; i < other.length; i++){
            if(!escapeFlag && other[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && other[i] == this.delimiter){
                this.noComponents ++;
            }
            else if(escapeFlag){
                escapeFlag = false;
            }
            
        }

        this.updateHashcode();
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
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
        return this.noComponents;
    }

    public doGetComponent(x: number): string {
        let counter = 0;
        let returnString = "";
        let escapeFlag = false;

        for(let i = 0; i < this.name.length; i++){

            if(!escapeFlag && this.name[i] == ESCAPE_CHARACTER){
                escapeFlag = true;
            }
            else if(!escapeFlag && this.name[i] == this.delimiter){
                counter ++;
                continue; //delimiter ist kein Teil der Component
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

    public doSetComponent(n: number, c: string) {

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

    public doInsert(n: number, c: string) {
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
        this.noComponents ++;
    }

    public doAppend(c: string) {
        this.name += this.delimiter + c;
        this.noComponents ++;
    }

    public doRemove(n: number) {
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

        this.noComponents --;
    }

    public concat(other: Name): Name {
        return super.concat(other);
    }

}
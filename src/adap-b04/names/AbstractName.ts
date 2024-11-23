import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

import { IllegalArgumentException  } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter){
            this.delimiter = delimiter;
        }
    }

    public clone(): Name {
        return { ...this };
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
        this.assertIsNotNullOrUndefined(other);

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

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getComponent(i: number): string{
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNegative(i);
        this.assertInBounds(i);

        return this.doGetComponent(i);
    }

    public setComponent(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNegative(i);
        this.assertInBounds(i);
        this.assertIsNotNullOrUndefined(c);

        this.doSetComponent(i, c);

        let oldLen = this.getNoComponents();

        //Postconditions
        this.assertValueAtIndex(i, c);

        if(this.getNoComponents() !== oldLen){
            throw new MethodFailureException("Postcondition failed: Number of components changed altough it should not")
        }

        //Class invariants
        this.assertClassInvarinats();
    }

    public insert(i:number, c: string): void{
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNegative(i);
        this.assertInBounds(i);
        this.assertIsNotNullOrUndefined(c);

        let oldLen = this.getNoComponents();

        this.doInsert(i,c);

        //Postconditions
        this.assertValueAtIndex(i, c);
        this.assertNumberComponentIncreased(oldLen);

        //Class invariants
        this.assertClassInvarinats();
    }

    public append(c: string): void{
        this.assertIsNotNullOrUndefined(c);

        let oldLen = this.getNoComponents();

        this.doAppend(c);

        //Postconditions
        let lastIndex = this.getNoComponents() -1;

        this.assertValueAtIndex(lastIndex, c);
        this.assertNumberComponentIncreased(oldLen);

                //Class invariants
                this.assertClassInvarinats();
    }

    public remove(i: number): void{
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNegative(i);
        this.assertInBounds(i);

        let oldLen = this.getNoComponents();


        this.doRemove(i);

        //Postconditions
        if(oldLen <= this.getNoComponents()){
            throw new IllegalArgumentException("Postcondition failed: Number of components did not decrease");
        }

        //Class invariants
        this.assertClassInvarinats();
    }


    abstract getNoComponents(): number;

    abstract doGetComponent(i: number): string;

    abstract doSetComponent(i: number, c: string): void;

    abstract doInsert(i: number, c: string): void;

    abstract doAppend(c: string): void;

    abstract doRemove(i: number): void;

    public concat(other: Name): void {
        this.assertIsNotNullOrUndefined(other);

        let oldLen = this.getNoComponents() + other.getNoComponents();

        for(let i = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }

        if(oldLen != this.getNoComponents()){
            throw new IllegalArgumentException("Postcondition failed: Concat name has not the number of components as both names together");
        }

        this.assertClassInvarinats();
    }

    protected assertIsNotNullOrUndefined(other: Object): void {
        if ((other == null) || (other == undefined)) {
            throw new IllegalArgumentException("Value is undefined");
        }
    }

    protected assertIsNotNegative(other: number): void {
        if (other < 0) {
            throw new IllegalArgumentException("Value is negative");
        }
    }

    protected assertValueAtIndex(index: number, value: string): void{
        if(this.getComponent(index) !== value){
            throw new MethodFailureException("Postcondition failed: Component at index ${i} was not set to the expected value");
        }
    }

    protected assertNumberComponentIncreased(oldNum: number): void{
        if(this.getNoComponents() <= oldNum){
            throw new MethodFailureException("Postcondition failed: Number of Components did not increase although it should");
        }
    }

    protected assertInBounds(index: number): void{
        if(this.getNoComponents() <= index){
            throw new MethodFailureException("Index out of bounds");
        }
    }

    protected assertClassInvarinats(): void{
        if((this.delimiter == null) || (this.delimiter == undefined)){
            throw new InvalidStateException("Delimiter is null or not defined");
        }

        if(this.delimiter == ""){
            throw new InvalidStateException("Delimiter can't be empty");
        }

        if(this.getNoComponents() < 0){
            throw new InvalidStateException("Number of components can't be negative");
        }

        for(let i = 0; i < this.getNoComponents(); i++){
            try{
                let comp = this.getComponent(i);
                if ((comp == null) || (comp == undefined)) {
                    throw new InvalidStateException("Component at index ${i} is null or undefined");
                }
            }
            catch(e){
                throw new InvalidStateException("Can't access Component at index ${i}");
            }
        }
    }


}
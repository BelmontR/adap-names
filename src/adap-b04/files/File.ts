import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        //this.assertInCorrectStateWhenOpen();
        // do something
    }

    public close(): void {
        //this.assertInCorrectStateWhenClosed();
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertInCorrectStateWhenOpen(): void{
        if(this.doGetFileState() !== FileState.CLOSED){
            throw new IllegalArgumentException("Precondition failed: Can't call open() when File is not closed.");
        }
    }

    protected assertInCorrectStateWhenClosed(): void{
        if(this.doGetFileState() !== FileState.OPEN){
            throw new IllegalArgumentException("Precondition failed: Can't call close() when File is not open.");
        }
    }

}
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.assertIsNotNullOrUndefined(cn);
        
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.assertIsNotNullOrUndefined(cn);
        this.assertNodeIsChild(cn);

        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    protected assertNodeIsChild(node: Node){
        if(!this.childNodes.has(node)){
            throw new IllegalArgumentException("Node is not a child of this directory");
        }
    }

}
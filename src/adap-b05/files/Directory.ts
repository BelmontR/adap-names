import { Node } from "./Node";
import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }


    public findNodes(bn: string): Set<Node>{
        //this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);

        let resultSet = new Set<Node>();
        this.findNodesHelper(bn, resultSet);

        return resultSet;
    }
    
    public findNodesHelper(bn: string, currentSet: Set<Node>){
        if(this.getBaseName() == bn){
            currentSet.add(this);
        }
        for(var child of this.childNodes.values()){
            child.findNodesHelper(bn, currentSet);
        }

    }

}
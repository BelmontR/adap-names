import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";

import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { Node } from "./Node";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
        const condition: boolean = (bn == ""); // Root must have "" as base name
        AssertionDispatcher.dispatch(et, condition, "invalid base name");
    }

    public findNodes(bn: string): Set<Node>{
        this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);

        let resultSet = new Set<Node>();
        this.findNodesHelper(bn, resultSet);

        return resultSet;
    }



}
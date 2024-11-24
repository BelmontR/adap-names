import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException  } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.assertIsNotNullOrUndefined(bn);
        this.assertNameNotEmpty(bn);
        this.assertIsNotNullOrUndefined(pn);

        this.doSetBaseName(bn);
        this.parentNode = pn;
    }

    public move(to: Directory): void {
        this.assertIsNotNullOrUndefined(to);
        
        this.parentNode.remove(this);
        to.add(this);
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertIsNotNullOrUndefined(bn);
        this.assertNameNotEmpty(bn);

        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Node {
        return this.parentNode;
    }

    protected assertIsNotNullOrUndefined(other: Object): void {
        if ((other == null) || (other == undefined)) {
            throw new IllegalArgumentException("Precondition failed: Value is undefined");
        }
    }

    protected assertNameNotEmpty(name: string): void {
        if(name == ""){
            throw new IllegalArgumentException("Precondition failed: Directory's name is empty");
        }
    }

}

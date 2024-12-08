import { describe, it, expect } from "vitest";

import { Name } from "../../src/adap-b06/names/Name";
import { StringName } from "../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../src/adap-b06/names/StringArrayName";
import { InvalidStateException } from "../../src/adap-b04/common/InvalidStateException";
import { MethodFailureException } from "../../src/adap-b04/common/MethodFailureException";
import { AbstractName } from "../../src/adap-b06/names/AbstractName";

describe("Basic StringArrayName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringArrayName(["oss", "fau", "de"]);
      let m = n.insert(1, "cs");
      expect(n.asString()).toBe("oss.fau.de");
      expect(m.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau"]);
      let m = n.append("de");
      expect(n.asString()).toBe("oss.cs.fau");
      expect(m.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
      let m = n.remove(0);
      expect(n.asString()).toBe("oss.cs.fau.de");
      expect(m.asString()).toBe("cs.fau.de");
    });
    it("test clone", () => {
        let n: AbstractName = new StringArrayName(["oss", "cs", "fau", "de"]);
        let c = n.clone();
        expect(n.asString()).toBe("oss.cs.fau.de");
        expect(n.getHashCode()).toBe(n.getHashCode());
      });
      it("test clone 2", () => {
        let n: AbstractName = new StringArrayName(["oss", "cs", "fau", "de"]);
        let c = n.clone();
        expect(n.asString()).toBe("oss.cs.fau.de");
        expect(n.getHashCode()).toBe(n.getHashCode());
      });
    it("test setComponent", () => {
        let n: AbstractName = new StringArrayName(["oss", "cs", "fau", "de"]);
        let m = n.setComponent(0,"x")
        expect(n.asString()).toBe("oss.cs.fau.de");
        expect(m.asString()).toBe("x.cs.fau.de");
      });
    it("test concat", () => {
        let n: AbstractName = new StringArrayName(["oss", "cs", "fau", "de"]);
        let m: AbstractName = new StringArrayName(["a", "b", "c"]);
        let x = n.concat(m);
        expect(n.asString()).toBe("oss.cs.fau.de");
        expect(m.asString()).toBe("a.b.c");
        expect(x.asString()).toBe("oss.cs.fau.de.a.b.c");
      });
  });


  describe("Basic StringName function tests", () => {
    it("test asString", () => {
      let n: Name = new StringName("oss.fau.de");
      expect(n.asString()).toBe("oss.fau.de");
    });
    it("test insert", () => {
      let n: Name = new StringName("oss.fau.de");
      let m = n.insert(1,"t");
      expect(n.asString()).toBe("oss.fau.de");
      expect(m.asString()).toBe("oss.t.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringName("oss.fau.de");
      let m = n.append("t");
      expect(n.asString()).toBe("oss.fau.de");
      expect(m.asString()).toBe("oss.fau.de.t");
    });
    it("test remove", () => {
      let n: Name = new StringName("oss.fau.de");
      let m = n.remove(1);
      expect(n.asString()).toBe("oss.fau.de");
      expect(m.asString()).toBe("oss.de");
    });
    it("test clone", () => {
      let n: AbstractName = new StringName("oss.fau.de");
      let c = n.clone();
      expect(n.getHashCode()).toBe(n.getHashCode());
    });
    it("test setComponent", () => {
      let n: AbstractName = new StringName("oss.cs.fau.de");
      let m = n.setComponent(1,"x")
      expect(n.asString()).toBe("oss.cs.fau.de");
      expect(m.asString()).toBe("oss.x.fau.de");
    });
  it("test concat", () => {
      let n: AbstractName = new StringName("oss.cs.fau.de");
      let m: AbstractName = new StringArrayName(["a", "b", "c"]);
      let x = n.concat(m);
      expect(n.asString()).toBe("oss.cs.fau.de");
      expect(m.asString()).toBe("a.b.c");
      expect(x.asString()).toBe("oss.cs.fau.de.a.b.c");
    });
    it("test concat2", () => {
      let n: AbstractName = new StringName("oss.cs.fau.de");
      let m: AbstractName = new StringName("a.b.c");
      let x = n.concat(m);
      expect(n.asString()).toBe("oss.cs.fau.de");
      expect(m.asString()).toBe("a.b.c");
      expect(x.asString()).toBe("oss.cs.fau.de.a.b.c");
    });


});

  
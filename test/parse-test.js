"use strict";

const expect = require("chai").expect;
const parse = require("../lib/parse.js");

describe("parse", () => {
  describe("time", () => {
    it("parses time in mm:ss form", () => {
      const result = parse.time("13:37");
      expect(result).to.equal(817);
    });

    it("parses time in hh:mm:ss form", () => {
      const result = parse.time("12:34:56");
      expect(result).to.equal(45296);
    });

    it("parses time in dd:hh:mm:ss form", () => {
      const result = parse.time("02:12:34:56");
      expect(result).to.equal(218096);
    });

    it("parses time in Xmin form", () => {
      const result = parse.time("10min");
      expect(result).to.equal(600);
    });

    it("parses time in XminYsec form", () => {
      const result = parse.time("5min30sec");
      expect(result).to.equal(330);
    });

    it("parses time in XhYmZsform", () => {
      const result = parse.time("1h5m30s");
      expect(result).to.equal(3930);
    });

    it("parses time in Xdays form", () => {
      const result = parse.time("2days");
      expect(result).to.equal(172800);
    });

    it("parses time in Xhour form", () => {
      const result = parse.time("2hour");
      expect(result).to.equal(7200);
    });

    it("parses time case-insensitive", () => {
      const result = parse.time("5MIN30S");
      expect(result).to.equal(330);
    });

    it("returns NaN if invalid input", () => {
      const result = parse.time("-");
      expect(result).to.be.NaN;
    });

    it("returns NaN if argument is not a string", () => {
      const result = parse.time(null);
      expect(result).to.be.NaN;
    });

    it("returns NaN if missing unit", () => {
      const result = parse.time("2m1");
      expect(result).to.be.NaN;
    });

    it("returns NaN if bad format", () => {
      const result = parse.time("23:a7");
      expect(result).to.be.NaN;
    });
  });

  describe("length", () => {
    it("parses length in Xk form", () => {
      const result = parse.length("10k");
      expect(result).to.equal(10000);
    });

    it("parses length in X.Yk form", () => {
      const result = parse.length("10.52k");
      expect(result).to.equal(10520);
    });

    it("parses length in Xkm form", () => {
      const result = parse.length("10km");
      expect(result).to.equal(10000);
    });

    it("parses length in X.Ykm form", () => {
      const result = parse.length("10.52km");
      expect(result).to.equal(10520);
    });

    it("parses length in Xm form", () => {
      const result = parse.length("825m");
      expect(result).to.equal(825);
    });

    it("parses length in Xmi form", () => {
      const result = parse.length("10mi");
      expect(result).to.equal(16093);
    });

    it("parses length in X.Ymi form", () => {
      const result = parse.length("13.1mi");
      expect(result).to.equal(21082);
    });

    it("understands marathon length ('ma')", () => {
      const result = parse.length("ma");
      expect(result).to.equal(42195);
    });

    it("understands half-marathon length ('hm')", () => {
      const result = parse.length("hm");
      expect(result).to.equal(21098);
    });

    it("returns NaN if unregnized format", () => {
      const result = parse.length("100yds");
      expect(result).to.be.NaN;
    });

    it("parses length case-insensitive", () => {
      const result = parse.length("1.5K");
      expect(result).to.equal(1500);
    });

    it("returns NaN if invalid input", () => {
      const result = parse.length("-5km");
      expect(result).to.be.NaN;
    });

    it("returns NaN if argument is not a string", () => {
      const result = parse.length(null);
      expect(result).to.be.NaN;
    });

    it("returns NaN if missing unit", () => {
      const result = parse.length("2");
      expect(result).to.be.NaN;
    });

    it("returns NaN if bad format", () => {
      const result = parse.length("a7km");
      expect(result).to.be.NaN;
    });
  });

  describe("pace", () => {
    it("parses pace in mm:ss form (defaults to kilometers)", () => {
      const result = parse.pace("5:00");
      expect(result).to.equal(0.3);
    });

    it("parses pace in mm:ss/km form", () => {
      const result = parse.pace("04:30/km");
      expect(result).to.equal(0.27);
    });

    it("parses pace in mm:ss/mi form", () => {
      const result = parse.pace("04:00/mi");
      expect(result).to.equal(0.14913316348723046);
    });

    it("parses pace in XminYsec/mi form", () => {
      const result = parse.pace("4min3s/km");
      expect(result).to.equal(0.243);
    });

    it("returns NaN if unsupported length unit", () => {
      const result = parse.pace("1s/m");
      expect(result).to.be.NaN;
    });

    it("returns NaN if argument is not a string", () => {
      const result = parse.pace(null);
      expect(result).to.be.NaN;
    });

    it("returns NaN if bad format", () => {
      const result = parse.pace("2:a7/km");
      expect(result).to.be.NaN;
    });
  });
});

"use strict";

const expect = require("chai").expect;
const rp = require("../lib/run-pace.js");

describe("run pace", () => {
  describe("calculatePace", () => {
    it("kilometers, time in mm:ss", () => {
      const result = rp.calculatePace({time: "60:00", length: "10km"});
      expect(result).to.equal("6:00/km");
    });

    it("kilometers, time in XminYsec", () => {
      const result = rp.calculatePace({time: "20min36sec", length: "5K"});
      expect(result).to.equal("4:07/km");
    });

    it("kilometers given, force imperial", () => {
      const result = rp.calculatePace({time: "20:36", length: "5K", imperial: true});
      expect(result).to.equal("6:38/mi");
    });

    it("miles", () => {
      const result = rp.calculatePace({time: "4min", length: "1mi"});
      expect(result).to.equal("4:00/mi");
    });

    it("slow runner", () => {
      const result = rp.calculatePace({time: "1day12h3s", length: "1k"});
      expect(result).to.equal("1:12:00:03/km");
    });

    it("throws if missing parameter \"time\"", () => {
      const fn = rp.calculatePace.bind(null, {length: "10k"});
      expect(fn).to.throw();
    });

    it("throws if missing parameter \"length\"", () => {
      const fn = rp.calculatePace.bind(null, {time: "4:00/km"});
      expect(fn).to.throw();
    });
  });

  describe("calculateTime", () => {
    it("pace without unit, half-marathon", () => {
      const result = rp.calculateTime({pace: "4:47", length: "hm"});
      expect(result).to.equal("1:40:55");
    });

    it("pace per kilometer, 10K", () => {
      const result = rp.calculateTime({pace: "4:30/km", length: "10K"});
      expect(result).to.equal("45:00");
    });

    it("pace per mile, one mile", () => {
      const result = rp.calculateTime({pace: "4:00/mi", length: "1mi"});
      expect(result).to.equal("4:00");
    });

    it("throws if missing parameter \"pace\"", () => {
      const fn = rp.calculateTime.bind(null, {length: "10k"});
      expect(fn).to.throw();
    });

    it("throws if missing parameter \"length\"", () => {
      const fn = rp.calculateTime.bind(null, {pace: "4:00/km"});
      expect(fn).to.throw();
    });
  });

  describe("calculateLength", () => {
    it("pace without unit, time in hh:mm form. Removes trailing zero", () => {
      const result = rp.calculateLength({pace: "5:06", time: "31:08"});
      expect(result).to.equal("6.1 km");
    });

    it("pace per kilometer, time in Xmin form. Removes trailing zeroes and decimal point", () => {
      const result = rp.calculateLength({pace: "4:30/km", time: "45min"});
      expect(result).to.equal("10 km");
    });

    it("pace per kilometer, force imperial", () => {
      const result = rp.calculateLength({pace: "4:30/km", time: "45min", imperial: true});
      expect(result).to.equal("6.21 miles");
    });

    it("pace per mile, time in mm:ss form", () => {
      const result = rp.calculateLength({pace: "4:00/mi", time: "4:00"});
      expect(result).to.equal("1 mile");
    });

    it("throws if missing parameter \"pace\"", () => {
      const fn = rp.calculateLength.bind(null, {time: "45min"});
      expect(fn).to.throw();
    });

    it("throws if missing parameter \"time\"", () => {
      const fn = rp.calculateLength.bind(null, {pace: "4:00/km"});
      expect(fn).to.throw();
    });
  });
});

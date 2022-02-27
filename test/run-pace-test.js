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

    it("miles given, force metric", () => {
      const result = rp.calculatePace({time: "14:30", length: "2mi", metric: true});
      expect(result).to.equal("4:30/km");
    });

    it("miles", () => {
      const result = rp.calculatePace({time: "4min", length: "1mi"});
      expect(result).to.equal("4:00/mi");
    });

    it("defaults to kilometers if no unit given", () => {
      const result = rp.calculatePace({time: "4min", length: "1"});
      expect(result).to.equal("4:00/km");
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

    it("1 km in 60 seconds", () => {
      const result = rp.calculatePace({time: "60s", length: "1km"});
      expect(result).to.equal("1:00/km");
    });

    it("1 km in 59 seconds", () => {
      const result = rp.calculatePace({time: "59s", length: "1km"});
      expect(result).to.equal("0:59/km");
    });

    it("1 km in 1 second", () => {
      const result = rp.calculatePace({time: "1s", length: "1km"});
      expect(result).to.equal("0:01/km");
    });

    it("3 km in 1 second", () => {
      const result = rp.calculatePace({time: "1s", length: "3km"});
      expect(result).to.equal("0:00/km");
    });
  });

  describe("calculateTime", () => {
    it("no units", () => {
      const result = rp.calculateTime({pace: "4:47", length: "1"});
      expect(result).to.equal("4:47");
    });

    it("no units, imperial flag", () => {
      const result = rp.calculateTime({pace: "4:47", length: "1", imperial: true});
      expect(result).to.equal("4:47");
    });

    it("pace without unit, defaults to kilometers, half-marathon", () => {
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

    it("length without unit, defaults to kilometers", () => {
      const result = rp.calculateTime({pace: "7:00/km", length: "3.2"});
      expect(result).to.equal("22:24");
    });

    it("length without unit, imperial flag", () => {
      const result = rp.calculateTime({pace: "7:00/mi", length: "3.2", imperial: true});
      expect(result).to.equal("22:24");
    });

    it("pace without unit, imperial flag", () => {
      const result = rp.calculateTime({pace: "7:00", length: "3.2mi", imperial: true});
      expect(result).to.equal("22:24");
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

    it("pace per mile, force metric", () => {
      const result = rp.calculateLength({pace: "7:15/mi", time: "13m30s", metric: true});
      expect(result).to.equal("3 km");
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

    it("throws if options object is missing", () => {
      const fn = rp.calculateLength.bind(null, null);
      expect(fn).to.throw();
    });
  });

  describe("speed", () => {
    describe("paceToSpeed", () => {
      it("metric", () => {
        const result = rp.paceToSpeed({pace: "5:00/km", speed: true});
        expect(result).to.equal("12 km/h");
      });

      it("imperial", () => {
        const result = rp.paceToSpeed({pace: "4:00/mi", speed: true});
        expect(result).to.equal("15 mph");
      });

      it("metric, force imperial", () => {
        const result = rp.paceToSpeed({pace: "6:00/km", speed: true, imperial: true});
        expect(result).to.equal("6.2 mph");
      });

      it("imperial, force metric", () => {
        const result = rp.paceToSpeed({pace: "6:00/mi", speed: true, metric: true});
        expect(result).to.equal("16.1 km/h");
      });

      it("throws if pace is missing", () => {
        const fn = rp.paceToSpeed.bind(null, {});
        expect(fn).to.throw("Missing parameter: \"pace\" must be specified");
      });

      it("throws if invalid pace", () => {
        const fn = rp.paceToSpeed.bind(null, {pace: "not a pace"});
        expect(fn).to.throw("Time is missing one or more units: not a pace");
      });

      it("throws if missing options object", () => {
        const fn = rp.paceToSpeed.bind(null);
        expect(fn).to.throw("Missing parameter: \"pace\" must be specified");
      });
    });

    describe("calculatePace with speed flag", () => {
      it("metric", () => {
        const result = rp.calculatePace({time: "6:00", length: "1km", speed: true});
        expect(result).to.equal("10 km/h");
      });

      it("imperial", () => {
        const result = rp.calculatePace({time: "6:00", length: "1mi", speed: true});
        expect(result).to.equal("10 mph");
      });

      it("metric, force imperial", () => {
        const result = rp.calculatePace({time: "6:00", length: "1km", speed: true, imperial: true});
        expect(result).to.equal("6.2 mph");
      });

      it("imperial, force metric", () => {
        const result = rp.calculatePace({time: "6:00", length: "1mi", speed: true, metric: true});
        expect(result).to.equal("16.1 km/h");
      });
    });
  });
});

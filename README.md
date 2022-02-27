# run-pace
Calculate running pace, time or length by providing the other two.

Interactive demo: https://daghall.github.io/run-pace/

# Table of contents
<!-- toc start -->
 - [CLI](#cli)
   - [Installation](#installation)
   - [Usage](#usage)
   - [Examples](#examples)
 - [Node module](#node-module)
   - [Installation](#installation)
   - [Usage](#usage)
     - [Methods](#methods)
       - [`calculateLength`](#calculatelength)
         - [Example](#example)
       - [`calculateTime`](#calculatetime)
         - [Example](#example)
       - [`calculatePace`](#calculatepace)
         - [Example](#example)
   - [Parameters in detail](#parameters-in-detail)
     - [Time](#time)
       - [`[[dd:][hh:]mm:ss`](#ddhhmmss)
         - [Examples](#examples)
       - [`X<d>Y<h>Z<m>W<s>`](#xdyhzmws)
         - [Examples](#examples)
     - [Length](#length)
       - [`X<unit>`](#xunit)
       - [`<constant>`](#constant)
         - [Examples](#examples)
     - [Pace](#pace)
       - [`<time>/<unit>`](#timeunit)
     - [Imperial](#imperial)
     - [Metric](#metric)
     - [Speed](#speed)
 - [Tips and tricks](#tips-and-tricks)
   - [Convert kilometer-pace to mile-pace](#convert-kilometer-pace-to-mile-pace)
   - [Convert mile-pace to kilometer-pace](#convert-mile-pace-to-kilometer-pace)
   - [Convert kilometer-pace to km/h](#convert-kilometer-pace-to-kmh)
   - [Convert mile-pace to mph](#convert-mile-pace-to-mph)
<!-- toc end -->

# CLI

Run as a command line program.

## Installation

```npm install -g run-pace```

## Usage
```run-pace -t <time> -l <length> -p <pace> [-i] [-m]```

Two of "time", "length" and "pace" must be provided.  
"Speed" is only valid when (only) pace is given or calculated

```
Parameters:
   -l, --length,    <value><unit> (10km, 10mi, 10000m, hm, ma)
   -p, --pace,      <value>/<unit> (4:30/km, 4m30s/mi)
   -t, --time,      <value> (11:23, 11min23sec, 11m23s)
   -i, --imperial,  force imperial output
   -m, --metric,    force metric output
   -s, --speed,     output speed instead of pace
```

## Examples
```
run-pace -p 4:50/km -t 1hour
12.41 km

run-pace -p 4:50/km -l 3.5km
16:55

run-pace -p 4:30/km -s -i
8.3 mph

run-pace -l 3 -t 15:00
5:00/km
```

# Node module

Use in a node script.

## Installation
```npm install run-pace```

## Usage

```javascript
const runPace = require("run-pace");
```

### Methods

All methods takes an object as its only argument.

#### `calculateLength`

Call with an object with the properties `time` and `length`.

##### Example
```javascript
const length = runPace.calculateLength({
  time: "45m",
  pace: "4:30/km",
});

console.log(length); // 10km
```

#### `calculateTime`

Call with an object with the properties `pace` and `length`.

##### Example
```javascript
const time = runPace.calculateTime({
  length: "10km",
  pace: "4:30/km",
});

console.log(time); // 45:00
```

#### `calculatePace`

Call with an object with the properties `time` and `length`.

##### Example
```javascript
const pace = runPace.calculatePace({
  time: "45m",
  length: "10km",
});

console.log(pace); // 4:30/km
```

## Parameters in detail

### Time

Can be provided in the following formats:

#### `[[dd:][hh:]mm:ss`

##### Examples
- `04:40`
- `2:44:36`
- `0:59`
- `0:3599` (non-standard)

#### `X<d>Y<h>Z<m>W<s>`

Only one unit needs to be provided.

- `<d>`is in the format `days`, `day` or `d`
- `<h>`is in the format `hours`, `hour`, hrs` or `h`
- `<m>`is in the format `mins`, `min` or `m`
- `<s>`is in the format `secs`, `sec` or `s`

##### Examples
- `2days13hours45mins16secs`
- `3hrs15sec`
- `23m16s`

---

### Length

Defaults to kilometers. If length is provided in miles, imperial output is implicitly enabled, but can be overridden using the [metric](#metric) switch.

If no unit is given, the type is inferred from the [metric](#metric)/[imperial](#imperial) flags, and/or the unit given in the [pace](#pace) field.

#### `X<unit>`
`X` is a number, including optional decimal point

`<unit>` is one of the following:
- Kilometers: `km` or `k`
- Meters: `m`
- Miles: `mi`
- Blank: defaults to kilometers

#### `<constant>`

- Half-marathon: `hm`
- Marathon: `ma`

##### Examples
- `hm`
- `10k`
- `5.25KM`(case-insensitive)
- `26.21875mi`

---

### Pace

Defaults to kilometer pace. If length is provided in miles, imperial output is implicitly enabled, but can be overridden using the [metric](#metric) switch.

#### `<time>/<unit>`

`<time>` as specified [above](#time)

`<unit>` is `km` or `mi` if explicitly given. Left blank it defaults to `km` or is inferred from other given parameters

---

### Imperial

Default output is kilometers. Use this switch to force output in miles.

---

### Metric

If miles are given in [pace](#pace) or [length](#length) output will be in miles as well. Use this switch to force output in kilometers.

---

### Speed

Output speed in instead of pace. Units used are _km/h_ or _mph_ depending on types/options specified.

Only valid if pace is given or calculated.

# Tips and tricks

## Convert kilometer-pace to mile-pace
```
run-pace -t 7m15s -l 1mi -m
4:30/km
```

## Convert mile-pace to kilometer-pace
```
run-pace -t 4:30 -l 1k -i
7:15/mi
```

## Convert kilometer-pace to km/h
```
run-pace -p 4:55/km -s
12.2 km/h
```

## Convert mile-pace to mph
```
run-pace -p 4:00/mi -s
15 mph
```

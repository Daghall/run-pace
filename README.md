# run-pace
Calculate running pace, time or length by providing the other two.

# Table of contents
<!-- toc start -->
 - [CLI](#cli)
   - [Installation](#installation)
   - [Usage](#usage)
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
 - [Tips and tricks](#tips-and-tricks)
   - [Convert kilometer-pace to mile-pace](#convert-kilometer-pace-to-mile-pace)
   - [Convert mile-pace to kilometer-pace](#convert-mile-pace-to-kilometer-pace)
<!-- toc end -->

# CLI

Run as a command line program.

## Installation

```npm install -g run-pace```

## Usage
```run-pace -t <time> -l <length> -p <pace> [-i] [-m]```

Two of "time", "length" and "pace" must be provided.

```
Parameters:
   -l, --length,    <value><unit> (10km, 10mi, 10000m, hm, ma)
   -p, --pace,      <value>/<unit> (4:30/km, 4m30s/mi)
   -t, --time,      <value> (11:23, 11min23sec, 11m23s)
   -i, --imperial,  force imperial output
   -m, --metric,    force metric output
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
const length = runPase.calculateLength({
  time: "45m",
  pace: "4:30/km",
});

console.log(length); // 10km
```

#### `calculateTime`

Call with an object with the properties `pace` and `length`.

##### Example
```javascript
const time = runPase.calculateTime({
  length: "10km",
  pace: "4:30/km",
});

console.log(time); // 45:00
```

#### `calculatePace`

Call with an object with the properties `time` and `length`.

##### Example
```javascript
const pace = runPase.calculatePace({
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

If length is provided in miles, imperial output is enabled.

#### `X<unit>`
`X` is a number, including optional decimal point

`<unit>` is one of the following:
- Kilometers: `km` or `k`
- Meters: `m`
- Miles: `mi`

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

If pace is provided in miles, imperial output is enabled.

#### `<time>/<unit>`

`<time>` as specified [above](#time)

`<unit>` is `km` or `mi`

---

### Imperial

Default output is kilometers. Use this switch to force output in miles.

---

### Metric

If miles are given in [pace](#pace) or [length](#length) output will be in miles as well. Use this switch to force output in kilometers.

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

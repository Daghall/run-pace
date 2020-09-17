# run-pace
Calculate running pace, time or length by providing the other two.

# Table of contents
<!-- toc start -->
 - [Installation](#installation)
 - [Using](#using)
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

# Installation
```npm install -g run-pace```

# Using
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

## Tips and tricks

### Convert kilometer-pace to mile-pace
```
run-pace -t 7m15s -l 1mi -m
4:30/km
```

### Convert mile-pace to kilometer-pace
```
run-pace -t 4:30 -l 1k -i
7:15/mi
```

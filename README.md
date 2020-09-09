# run-pace
Calculate running pace, time or length by providing the other two.

# Installation
```npm install -g run-pace```

# Using
```run-pace -t <time> -l <length> -p <pace> [-i]```

Two of "time", "length" and "pace" must be provided.

```
Parameters:
   -l, --length,    <value><unit> (10km, 10mi, 10000m, hm, ma)
   -p, --pace,      <value>/<unit> (4:30/km, 4m30s/mi)
   -t, --time,      <value> (11:23, 11min23sec, 11m23s)
   -i, --imperial,  force imperial output
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

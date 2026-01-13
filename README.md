# count-ui

A lightweight, HTML-first web component for displaying formatted numbers with support for **short notation**, **custom separators**, **prefixes**, **suffixes**, and **precision**.
## Features
 - Easy-to-use `<count-ui>` custom element
 - Format numbers with thousands separators (, / . / custom)
 - Show **short numbers** (`K`, `M`, `B`)
 - Add prefix or suffix to numbers
 - Control decimal precision
 - Works in plain HTML — no framework required

## Installation
### Using `<script>` tag
```html
<script src="https://count-ui.onrender.com/src/count-ui.js"></script>
```
### Using NPM
```bash
npm i count-ui
```

## Usage

Basic number display:
```html
<count-ui val="1234567"></count-ui>
<!-- 1,234,567 -->
```
### With custom separator
```html
<count-ui val="1234567" sep="."></count-ui>
<!-- 1.234.567 -->
```
### Short notation
```html
<count-ui val="1500" short></count-ui>
<!-- 1.5K -->
```
### Prefix / Suffix
```html
<count-ui val="2500" pref="$" suff=" USD"></count-ui>
<!-- $2,500 USD -->
```
### Decimal precision
```html
<count-ui val="3.14159" prec="2"></count-ui>
<!-- 3.14 -->
```
### Combining features
```html
<count-ui val="1500000" short pref="$" suff=" USD"></count-ui>
<!-- $1.5M USD -->
```

### Attributes

| Attribute | Type    | Description                                             |
| --------- | ------- | ------------------------------------------------------- |
| `val`     | Number  | The number to display                                   |
| `sep`     | String  | Thousands separator (`,` by default)                    |
| `short`   | Boolean | Display number in short notation (K, M, B)              |
| `prec`    | Number  | Decimal precision (applied only if `short` is not used) |
| `pref`    | String  | Text to prepend (prefix)                                |
| `suff`    | String  | Text to append (suffix)                                 |

### Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>count-ui demo</title>
  <script type="module" src="count-ui.onrender.com/src/count-ui.js"></script>
</head>
<body>
  <h1>count-ui Examples</h1>

  <count-ui val="1234567"></count-ui>
  <br>
  <count-ui val="1500" short></count-ui>
  <br>
  <count-ui val="2500" pref="$" suff=" USD"></count-ui>
  <br>
  <count-ui val="3.14159" prec="2"></count-ui>
  <br>
  <count-ui val="1500000" short pref="$" suff=" USD"></count-ui>

</body>
</html>
```

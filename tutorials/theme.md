stylish has a function for setting theme variables. which can be exposed by passing a function to stylish.

```javascript
stylish.createTheme(() => ({
  brandColor: '#1abc9c',
  font: { large: '2rem', small: '0.8rem' }
}));

const [ headerFont, accentFont ] = stylish(({ brandColor, font }) => [
  { color: brandColor, fontSize: font.large },
  { color: brandColor, fontSize: font.small },
]);
```

the theme can be removed using `stylish.clearTheme()` or replaced by invoking `stylish.createTheme({})` again.



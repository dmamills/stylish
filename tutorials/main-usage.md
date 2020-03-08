stylish's main function returns the generated class name(s).

It is a variadic function that can take any number of style objects and will batch create them.

It will also accept a function, which recieves a theme object arguement for more information about themes see {@tutorial theme}

```javascript
const redText = stylish({ color: 'red' }); // -> "stylish-<id>"

const [ redText, blueText ] = stylish({
  color: 'red'
}, {
  color: 'blue'
}); // -> [ "stylish-<id>", "stylish-<id>" ]

const greenText = stylish((theme) => { color: theme.brandGreen }); // -> "stylish-<id>"
```


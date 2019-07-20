stylish can be used to create keyframes for animation. 

this is done in a two step process. 

the first call to stylish declares your keyframes animation object. the generated name can then be applied to any classes you wish. 

```javascript
const animation = stylish({
  '@keyframes': {
    '0%': { transform: "scale(0.5)" },
    '100%': { transform: "scale(1.5)" }
  }
});

const box = stylish({
  width: '20px',
  height: '20px',
  backgroundColor: 'red',
  animation: `${animation} 1s infinite`
});
```

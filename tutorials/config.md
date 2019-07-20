stylish also allows for it's settings to be customized by exporting a single function for this. *settings must be overridden before any calls to `stylish` are made.*

```javascript
stylish.config({
  stylesheetId: 'custom-id',
  classPrefix: 'custom-prefix',
  id: () => Math.floor(Math.random() * 1000)
});
```

| Property | Description |
|----------------|---------------------------------------------------------|
| `stylesheedId` | The id assigned to the stylesheet. |
| `classPrefix` | The prefix that will be used for generated class names. |
| `id` | A function that will be called to generate a new id. |


an example of an incrementing custom id function:

```javascript
const id = (() => {
  let i = 1;
  return () => i++;
})();

stylish.config({
  id: id
});

const c1 = stylish({ color: 'red' }); // => "stylish-1"
const c2 = stylish({ color: 'blue' }); // => "stylish-2"
```

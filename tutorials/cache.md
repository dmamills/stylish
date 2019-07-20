stylish maintains an internal cache to prevent duplication of classes.

when stylish is invoked, a hash of the style object is created. this is stored with the generated class name. this prevents unnecessary classes from being created, as well as an easy look up for existing classes.

there are two helper functions exposed that deal with this cache. They are mostly used internally for testing.

```javascript
stylish.cache() // => { } returns cache object
stylish.clearCache() // => will reset the internal cache
```



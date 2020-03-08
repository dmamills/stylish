the basic examples page showcases something you can accomplish with just inline styles, what makes stylish very handy is that you are able to use psuedo, sibling, and nested selectors.


## pseudo 

```javascript

const linkText = stylish({
  color: 'blue',
  ':hover': {
    color: 'darkblue'
  }
}); // => 'stylish-xxxx'


/*
* generates:
 .stylish-xxxx { color: blue; }
 .stylish-xxxx:hover { color: darkblue; }
*/

```

## sibling 

```javascript

const blueParagraphs = stylish({
  color: 'blue',
  ' + p': {
    color: 'darkblue'
  }
}); // => 'stylish-xxxx'

/*
* generates:
 .stylish-xxxx { color: blue; }
 .stylish-xxxx + p { color: darkblue; }
*/

```

## nesting 

```javascript

const blueParagraphs = stylish({
  color: 'blue',
  ':hover': {
    color: 'darkblue',
    ' > strong': {
      fontSize: '2rem';
    }
  }
}); // => 'stylish-xxxx'
`
/*
* generates:
 .stylish-xxxx { color: blue; }
 .stylish-xxxx:hover > strong { font-size: 2rem; }
 .stylish-xxxx:hover { color: darkblue; }
*/
);

```


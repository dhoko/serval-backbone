#Serval backbone boilerplate

A boilerplate for **backbone.js**. From [Marrow](http://mdwn.in/gh/kud/marrow).

## How to install ?

### Requirements

- node.js
- npm
- bower

Ok, let's run : `npm install && bower install`

### Not included:

- Magic code *oh noooes!*
- Coffee *bad for your heart anyway*
- Give you the opportunity to twiddle your thumbs *sorry buddy*

### Included:

- A structure
- A great compilation process via Grunt
- Templating via lodash
- Lo-Dash instead of underscore for performance!
- Moments.js
- An HTTP server
- pushState
- ... all you need to begin a great app and being happy

## Explanation

```shell
.
├── GulpFile.js
├── README.md
├── .jshintrc
├── .editorconfig
├── .bowerrc
├── bower.json
├── build // final files
├── i18n // for i18n
    └── languages.json // i18n translations
├── doc // API documentation
├── package.json
└── src // where you code
    ├── layout // Your app layout (header,footer...)
    ├── partials // HTML partials
    ├── styles // Your css
    ├── assets // static files
    └── js // Your backbone app
        ├── app.js // $(document).ready
        ├── bootstrap.js
        ├── collections // http://backbonejs.org/#Collection
        ├── models // http://backbonejs.org/#Model
        ├── routers // http://backbonejs.org/#Router
        └── views // http://backbonejs.org/#View
```

## Development

```
$ gulp
```

## Do you have serval ?

Run `serval generate`, you will be able to create :
- A backbone view
- A new route
- A new partial
- A backbone view + its partial and add the route

## Note

Serval backbone boilerplate is built on top of [Marrow](https://github.com/kud/marrow).

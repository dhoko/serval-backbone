# Kiwapp Backbone.js boilerplate

A boilerplate for **backbone.js**. From [Marrow](http://mdwn.in/gh/kud/marrow) and [Serval Backbone](https://github.com/dhoko/serval-backbone).

## How to install ?

### Requirements

- node.js
- npm
- bower

Ok, let's run : `npm install && bower install`

### Included:

- A structure
- A great compilation process via Gulp
- Templating via lodash
- Lo-Dash instead of underscore for performance!
- Kiwapp.js
- Normalize.css
- jQuery 2.1
- Moment.js
- `box-sinzing : border-box`
- i18n
- Documentation with [Docker](https://github.com/jbt/docker)
- An HTTP server
- pushState
- some helpers
- ... all you need to begin a great app and being happy

## Helpers

This application contains some helepers :

- `openPage(page,delay)`
- `resetTimeout()`
- `tpl(viewName)`
- `log(msg)` : Alias of kiwapp.log()

It also provides a verbose mode, the default value it set to **1**, so you can view App's internal debugs. If you change the value to **0** it hides them.

> You can view these helpers inside `src/js/bootstrap.js`.

## Some tips

### Go to another page on click

You can create a button or anything else to redirect to another page. It's easy, you don't need to write a line of JavaScript.

```html
<button type="button" data-page-dest="form">Go to form</button>
```

That's it, just add `data-page-dest` attribute. Then add a page name and when you click, the application will know where is your destination.

> For the root page, just add root.

### i18n

You have to create a directory `i18n` if it does'nt exist. Than add a file : `languages.json`.

> Language are defined with a `-` as defined inside the [BCP 47](http://tools.ietf.org/html/bcp47). cf [Value of the HTML5 lang attribute](http://webmasters.stackexchange.com/questions/28307/value-of-the-html5-lang-attribute)

Ex :
```json
{
    "fr-FR" : {
        "baseline" : "le boilerplate Kiwapp avec Backbone.js"
    },
    "en-US" : {
        "baseline" : "Kiwapp's Boilerplate with Backbone.js"
    }
}
```

It's a JSON object, with primary key as language. If you don't configure the ShopParameters the first key is your default language.

## Switch to another language on click

You have to put something like this button :

```html
<button type="button" data-i18n="fr-FR" class="btn-i18n">fr-FR</button>
```

It can be anything else, but he has to have these:

- a className : `btn-i18n`
- an attribute : data-i18n with the value to change

### Details

Please read the issue, [Boilerplate Backbone #70](https://github.com/procheo/ProcheoApps/issues/70)

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
├── config // Application config
    └── kiwapp_config.js
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

## Config

Create a `kiwapp_config.js` inside the directory `config`

Ex :

```JavaScript
Kiwapp.set({
    appParameters : {
        deviceType : "webbrowser",
        osID : "webbrowser",
        deviceIdentifier : "Guillaume Chrome"
    },
    shopParameters : {
        lang : ["fr-FR","en-US"],
        url : "http://dev-gr.procheo.fr/upload/newlook/collect/save"
    },
    shopInfosConfig : {
        external_identifier : "1",
        address1 : "2 avenue de la cristallerie",
        zipcode : "93500",
        phone : "0645379283",
        name : "Procheo Dev",
        country_id : 72, //FRANCE
        country_name : "fr"
    }
});
```


## Development

```shell
$ gulp
```

## Production

```shell
$ gulp prod
```

It build the zip, update your manifest and aslo generate your API documention for the application.

## Do you have serval ?

Run `serval generate`, you will be able to create :
- A backbone view
- A new route
- A new partial
- A backbone view + its partial and add the route

## Note

Serval backbone boilerplate is built on top of [Marrow](https://github.com/kud/marrow).

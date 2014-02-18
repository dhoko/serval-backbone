var fs   = require('fs'),
    path = require('path');

module.exports = function(opt, cmd) {

  // Main helper to read and write files
  var file = {
    /**
     * Read and return the content of a file
     * @param  {String} fileName
     * @param  {Boolean} root    Use the root path of the app or not
     * @return {String}          Content of a file
     */
    read : function read(fileName,root) {
      try {
        _path = (root === undefined) ? opt.dir : opt.app;
        cmd.info("Read content for " + _path + fileName);
        return fs.readFileSync(_path + fileName, 'utf8');
      }catch(e) {
        cmd.error(e);
      }
    },

    /**
     * Write inside a new file or an existing one
     * @param  {String} fileName
     * @param  {String} content
     */
    write : function write(fileName, content) {
      try {
        fs.writeFileSync(opt.app + fileName,content);
        cmd.info(opt.app + fileName + ' is created');
      }catch(e) {
        cmd.error(e);
      }
    }
  };

  /**
   * App generators :
   *   - Route
   *   - View
   *   - Partial
   * @type {Object}
   */
  var tools = {

    // Create a view
    view : function view(name) {

      var viewTpl = file.read("view" + path.sep + "view.js"),
        tpl = {
          lower : name.toLowerCase(),
          capitalize : name,
        };

      viewTpl = viewTpl.replace(/==viewLower==/g,tpl.lower)
          .replace(/==viewCapitalize==/g,tpl.capitalize);
      viewTpl = cmd.beautify(viewTpl,{ indent_size: 2 });

      file.write("src" + path.sep + "js" + path.sep + "views" + path.sep + tpl.lower + ".js",viewTpl);
    },

    // Create a partial
    partial : function partial(name) {

      var lorem = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, voluptates, doloremque. Rerum, illum, fugiat nemo natus aperiam nesciunt provident excepturi quo suscipit earum maiores placeat reiciendis ipsa eum numquam aliquid.</p>';

      file.write("src" + path.sep + "partials" + path.sep + name.toLowerCase() +".html",lorem);
    },

    // Create a route and add it inside your router app file
    route : function route(name) {

      var router    = "src" + path.sep + "js" + path.sep + "routers" + path.sep + "router.js";
          routeTpl  = file.read("route" + path.sep + "route.js"),
          oldRoutes = file.read(router,true),
        tpl = {
          lower : name.toLowerCase(),
          capitalize : name,
        };

      routeTpl = routeTpl.replace(/==viewLower==/g,tpl.lower)
        .replace(/==viewCapitalize==/g,tpl.capitalize);

      oldRoutes = oldRoutes.replace(/\/\/=route=\/\//,routeTpl)
        .replace(/'home': 'home'/,"'home': 'home','"+tpl.lower+"': '"+tpl.lower+"'");
      oldRoutes = cmd.beautify(oldRoutes,{ indent_size: 2 });

      file.write(router,oldRoutes);
    }
  };

  /**
   * We will create a new partial from a custom template in your ./gloups directory
   * @param  {Object} data Object from your prompt inquirer or custom object
   */
  var build = function(data) {
      try {
        data.generator.split("-").forEach(function(current) {
          tools[current](data.name);
          cmd.success("The " + current + " is created");
        });
      }catch(e) {
        cmd.error(e);
      }
  }

  // Launch inquirer, a prompt to retreive some informations
  if(opt.args.length === 1) {
    cmd.inquirer.prompt([
      {
        type : "list",
        name : "generator",
        message : "Choose a generator :",
        choices : ["partial","view","route","partial-route-view"]
      },
      {
        type : "input",
        name : "name",
        message : "Name of this element :"
      },
    ], function(answers) {
      console.log(answers);
        build(answers);
    });
  }

  // Fast method to create a view gloups generator [generator]:[name] => gloups generator partial:test
  if(opt.args.length > 1 && opt.args[1].split(':').length === 2) {
    build({
      name : opt.args[1].split(':')[1],
      generator : opt.args[1].split(':')[0]
    },opt);
  }
}

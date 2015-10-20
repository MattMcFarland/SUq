var traverse = require('traverse');
var _ = require('lodash');
var microformat = require('microformat-node');
var xss = require('xss');


module.exports = function (body, callback) {


  microformat.parseHtml(body, {logger: false}, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    var index = 0;

    var items = traverse(data.items).forEach(function(item) {
      if (this.key === 'type' && this.notLeaf) {
        index ++;
        this.node.push(index);
      }
    });

    var flattenProps = function (props) {
      return traverse(props).reduce(function (acc) {
        if (this.key === 'content' && this.notLeaf) {
          if (this.node[0] &&
            this.node[0].html &&
            typeof this.node[0].html === "string") {
            this.node[0] = xss(this.node[0].html).replace(/\n/g, "");
          } else {
            if (this.node[0] &&
              this.node[0].value &&
              typeof this.node[0].value === "string") {
              this.node[0] = xss(this.node[0].value).replace(/\n/g, "");
            }          
          }
        }
        // If its an array, it is not empty, and it has only one item.
        if (Array.isArray(this.node) &&
          this.node.length === 1 &&
          this.level === 1 &&
          !this.node[0].properties && this.parent && this.parent.node) {
          acc[this.key] = (
            (typeof this.node[0] === "string") ?
              xss(this.node[0].replace(/(<([^>]+)>)/ig,"").substring(0, 255)) :
              this.node[0]
          );
        }
        return acc;
      }, {});
    };


    var result = traverse(items).reduce(function (acc) {

      if (this.key === 'type' && this.notLeaf) {

        var props = this.parent.node['properties'],
            size =  props.length ?
              props.length :
            Object.keys(props).length || 0;


        if (size) {
          acc.push({
            id: this.node[1],
            type: (this.node[0]),
            props: flattenProps(props),
            path: this.path,
            length: size,
            level: this.level
          });
        }
      }
      return acc;
    }, []);

    callback(null, result);

  });

};
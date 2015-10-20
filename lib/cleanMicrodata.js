var traverse = require('traverse');

module.exports = function (mdata, callback) {

  var index = 0;
  mdata = traverse(mdata).forEach(function(item) {
    if (this.key === 'type' && this.notLeaf) {
      index ++;
      this.node.push(index);
      //console.log(this.node);
    }
  });

  var flattenProps = function (props) {
    return traverse(props).reduce(function (acc) {
      // If its an array, it is not empty, and it has only one item.
      if (Array.isArray(this.node) &&
          this.node.length === 1 &&
          this.level < 3 &&
          !this.node[0].properties && this.parent && this.parent.node) {
        acc[this.key] = this.node[0];
      }
      if (this.level === 3) {
        //console.log('assign parent', this.parent.parent.node[0].type[1]);
        acc[this.parent.parent.key] = '__ref__' + this.parent.parent.node[0].type[1];
      }
      return acc;

    }, {});

  };

  var result = traverse(mdata).reduce(function (acc) {

    if (this.key === 'type' && this.notLeaf) {

      var props = this.parent.node['properties'],
          size =  props.length ?
                  props.length :
                  Object.keys(props).length || 0;


      if (size) {
        acc.push({
          id: this.node[1],
          type: this.node[0],
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
};
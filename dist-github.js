var ncp = require('ncp').ncp;

ncp.limit = 16;

var source = "./dist/iclearn/";
var dest = "../xddtech.github.io/iclearn/";
var opts = {
    clobber: true,
    filter: function(name) {
       //console.log('file=' + name);
       if (name.endsWith('index.html')) {
           console.log('---- skip: file=' + name);
           return false;
       }
       return true;
    }
};

ncp(source, dest, opts, function (err) {
   console.log('Start dist-github: source=' + source +', dest=' + dest);
   if (err) {
      return console.error('dist-github failed, ' + err);
   }
   console.log('dist-github done!');
});

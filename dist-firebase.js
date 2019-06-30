var ncp = require('ncp').ncp;

ncp.limit = 16;

var source = "./dist/iclearn/";
var dest = "../firebase/iclearn/public";
var opts = {
    clobber: true,
    filter: function(name) {
       return true;
    }
};

ncp(source, dest, opts, function (err) {
   console.log('Start dist-firebase: source=' + source +', dest=' + dest);
   if (err) {
      return console.error('dist-firebase failed, ' + err);
   }
   console.log('dist-firebase done!');
});
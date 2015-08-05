/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  Video.count().exec(function(err, numVideos) {

    if (err) {
      return cb(err);
    }

    if (numVideos > 0) {
      console.log('Existing video records: ', numVideos)
      return cb();
    }

    var Youtube = require('machinepack-youtube');
                   //#A
    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: 'AIzaSyBG6SfeuVny-lK22UvYJMXorKNxm3UXqYE',
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
      	return cb(err);
      },
      // OK.
      success: function(returnedVideos) {

      	 _.each(returnedVideos, function(video) {                   
          video.src = 'https://www.youtube.com/embed/' + video.id; 
          delete video.description;                               
          delete video.publishedAt;                               
          delete video.id;                                        
          delete video.url;                                       
        });

      	 Video.create (returnedVideos).exec(function(err, videoRecordsCreated) {
      	 	if (err) {
      	 		return cb();
      	 	}

      	 	console.log(videoRecordsCreated);                              
            return cb();
      	 });
      }, 
   });
    //return cb();
  });

  //cb();
};

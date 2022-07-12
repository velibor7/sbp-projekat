//db.getCollection("tracks").find({})

db.spotify.createIndex({"name":1})

//db.spotify.createIndex({"release_date":-1})
//db.spotify.dropIndex({"name":1})
//db.spotify.dropIndex({"release_date":-1})

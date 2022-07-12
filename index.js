db.tracks.dropIndex({popularity : -1})
db.tracks.createIndex({popularity : -1})
db.tracks.createIndex({valence :  -1})

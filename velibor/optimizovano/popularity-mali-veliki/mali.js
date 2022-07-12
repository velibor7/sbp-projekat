db.getCollection("tracks_expanded").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                // enter query here
                popularity: {$lt: 70}
            }
        },

        // Stage 2
        {
            $group: {
                _id: null,
                avg_tempo: {$avg: "$tempo"},
                avg_loudness: {$avg: "$loudness"},
                avg_instrumentalness: {$avg: "$instrumentalness"},
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
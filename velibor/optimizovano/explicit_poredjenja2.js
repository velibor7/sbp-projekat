db.getCollection("tracks_expanded").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                // enter query here
                // "object_artists.name": {$in: ['Dua Lipa', 'Ed Sheeran', 'Eminem', 'Cardi B']},
                "object_artists.followers": {$gt: 15000}
            }
        },

        // Stage 2
        {
            $group: {
                _id: "$explicit",
                count: {$sum : 1},
                avg_danceability: {$avg: "$danceability"},
                avg_tempo: {$avg: "$tempo"},
                avg_energy: {$avg: "$energy"},
            }
        },

        // Stage 3
        {
            $project: {
                // specifications
                _id: 0,
                explicit: "$_id",
                count: 1,
                avg_danceability: 1,
                avg_tempo: 1,
                avg_energy:1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
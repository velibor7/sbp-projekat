db.getCollection("tracks").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $lookup: // Equality Match
            {
                from: "artists",
                localField: "id_artists",
                foreignField: "_id",
                as: "pevaci"
            }
        },

        // Stage 2
        {
            $unwind: {
                path: "$pevaci"
            }
        },

        // Stage 3
        {
            $unwind: {
                path: "$pevaci.genres"
            }
        },

        // Stage 4
        {
            $match: {
                // enter query here
                "pevaci.genres": "techno"
            }
        },

        // Stage 5
        {
            $group: {
               "_id" :{date: {$year : "$release_date"}},
               avg_loudness: {$avg: "$loudness"},
               avg_duration: {$avg: "$duration_ms"},
               avg_danceability: {$avg: "$danceability"},
               avg_tempo: {$avg: "$tempo"}
            }
        },

        // Stage 6
        {
            $project: {
                // specifications
                _id: 0,
                date: "$_id.date",
                avg_duration: 1,
                avg_loudness: 1,
                avg_danceability: 1,
                avg_tempo: 1
            }
        },

        // Stage 7
        {
            $sort: {
                date: -1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
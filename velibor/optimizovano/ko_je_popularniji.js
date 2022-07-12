db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $unwind: {
                path: "$pevaci",
            }
        },

        // Stage 2
        {
            $match: {
                // enter query here
                "pevaci.name": {$in: ['Dua Lipa', 'Ed Sheeran', 'Eminem', 'Cardi B']},
                // "object_artists.followers": {$gt: 15000}
            }
        },

        // Stage 3
        {
            $group: {
                _id: "$pevaci.name",
                avg_popularity: {$avg: "$popularity"}
                //<field1>: { <accumulator1> : <expression1> },
                //...
            }
        },

        // Stage 4
        {
            $sort: {
                avg_popularity: -1
            }
        },

        // Stage 5
        {
            $project: {
                avg_popularity: 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);

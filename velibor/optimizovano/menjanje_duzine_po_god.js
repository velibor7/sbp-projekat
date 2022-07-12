db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                // enter query here
                "pevaci.followers": {$gt: 1000},
                "name": /^A/
            }
        },

        // Stage 2
        {
            $group: {
                "_id" :{date: {$year : "$release_date"}},
                avg_length: {$avg: "$duration_ms"}
            }
        },

        // Stage 3
        {
            $sort: {
                "_id.date": -1
            }
        },

        // Stage 4
        {
            $project: {
                date: "$_id.date",
                avg_length: 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);

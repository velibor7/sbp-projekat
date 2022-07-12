db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: { 
                "pevaci.followers" : {$gte : 1000}
            }
        },

        // Stage 2
        {
            $unwind: {
                path: "$pevaci",
            }
        },

        // Stage 3
        {
            $group: {
                _id: "$pevaci.name",
                avg_popularity : {$avg : "$popularity"},
                artist_popularity : {$avg : "$pevaci.popularity"} 
            }
        },

        // Stage 4
        {
            $project: {
               _id : 0, artist_name : "$_id", avg_popularity : 1, artist_popularity : 1    
            }
        },

        // Stage 5
        {
            $sort: {
                avg_popularity : -1
            }
        },

        // Stage 6
        {
            $limit: 15
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
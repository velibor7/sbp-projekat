db.getCollection("tracks").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $lookup: {
                from: "artists",
                localField: "id_artists",
                foreignField: "_id",
                as: "pevaci"
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
            $match: { 
                "pevaci.followers" : {$gte : 1000}
            }
        },

        // Stage 4
        {
            $group: {
                _id: "$pevaci.name",
                avg_popularity : {$avg : "$popularity"},
                artist_popularity : {$avg : "$pevaci.popularity"} 
            }
        },

        // Stage 5
        {
            $project: {
               _id : 0, artist_name : "$_id", avg_popularity : 1, artist_popularity : 1    
            }
        },

        // Stage 6
        {
            $sort: {
                avg_popularity : -1
            }
        },

        // Stage 7
        {
            $limit: 20
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
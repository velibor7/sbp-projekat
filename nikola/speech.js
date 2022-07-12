db.getCollection("tracks").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                    popularity : {$gte : 45}
            }
        },

        // Stage 2
        {
            $lookup: // Equality Match
            {
                from: "artists",
                localField: "id_artists",
                foreignField: "_id",
                as: "pevaci"
            }
            
            
        },

        // Stage 3
        {
            $match: {
                "pevaci.followers" : {$gte : 20000}    
            }
        },

        // Stage 4
        {
            $group: {
                 "_id" : "$time_signature",
                 avg_valence : {$avg : "$valence"},
                 avg_speecness : {$avg : "$speechiness"}   
            }
        },

        // Stage 5
        {
            $project: {
                _id : 0, time_signature : "$_id", avg_speecness : 1, avg_valence : 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
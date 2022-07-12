db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                $and : [
                    {popularity : {$gte: 45}},
                    {"pevaci.followers" : {$gte : 20000}}
                ]
                
            }
        },

        // Stage 2
        {
            $group: {
                 "_id" : "$time_signature",
                 avg_valence : {$avg : "$valence"},
                 avg_speecness : {$avg : "$speechiness"}   
            }
        },

        // Stage 3
        {
            $project: {
                _id : 0, time_signature : "$_id" ,avg_speecness : 1, avg_valence : 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
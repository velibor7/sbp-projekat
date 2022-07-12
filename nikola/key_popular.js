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
            $match: {
                $and : [
                    {valence : {$gte : 0.90}},
                    {release_date : {$gte :  new ISODate( "2000-01-01" )}} ,
                    {"pevaci.followers" : {$gte : 1000}}
                ]
                    
            }
        },

        // Stage 3
        {
            $group: {
                _id: {key : "$key", name : "$name"},
                max_popularity : {$max : "$popularity"}    
            }
        },

        // Stage 4
        {
            $project: {
                _id : 0, key:"$_id.key", max_popularity : 1, name :"$_id.name"    
            }
        },

        // Stage 5
        {
            $sort: {
                max_popularity : -1    
            }
        },

        // Stage 6
        {
            $limit: // positive integer
             10
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                $and : [
                    {valence : {$gte : 0.90}},
                    {release_date : {$gte :  new ISODate( "2000-01-01" )}} ,
                    {"pevaci.popularity" : {$lte : 1000}}
                ]
                    
            }
        },

        // Stage 2
        {
            $group: {
                _id: {key : "$key", name : "$name"},
                max_popularity : {$max : "$popularity"}    
            }
        },

        // Stage 3
        {
            $project: {
                _id : 0, key:"$_id.key", max_popularity : 1, name :"$_id.name"    
            }
        },

        // Stage 4
        {
            $sort: {
                max_popularity : -1    
            }
        },

        // Stage 5
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
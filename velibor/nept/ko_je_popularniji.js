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
            
            // Uncorrelated Subqueries
            // (supported as of MongoDB 3.6)
            // {
            //    from: "<collection to join>",
            //    let: { <var_1>: <expression>, …, <var_n>: <expression> },
            //    pipeline: [ <pipeline to execute on the collection to join> ],
            //    as: "<output array field>"
            // }
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
                // enter query here
                 "pevaci.name": {$in: ['Dua Lipa', 'Ed Sheeran', 'Eminem', 'Cardi B']},
            }
        },

        // Stage 4
        {
            $group: {
                _id: "$pevaci.name",
                avg_popularity: {$avg: "$popularity"}
            }
        },

        // Stage 5
        {
            $sort: {
                avg_popularity: -1
            }
        },

        // Stage 6
        {
            $project: {
                // specifications
                 avg_popularity: 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
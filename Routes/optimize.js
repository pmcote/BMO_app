//Parse BOM, make quiries of the API, sort data for 
//break point/inventory >> display

//Parse CSV for queries (we want the Value and the Type, also Ref)

var octopart = require('octopart');

//Pass as a API search endpoint and grab the JSON output
octopart.apikey = '4335fcd7';
var q = [
	{reference: '1', keyword: '10uF' }
];

octopart.parts.search(q, {
	exact_only: true,
    show: ['uid','mpn','manufacturer']
}).success(function(body) {
    for(var i=0;i<body.results.length;i++) {
        console.log("Result", i, body.results[i].items);
    }
}).failure(function(err) {
    console.log("Honey, I think I broke it. . .", err);
});


//Analysis on the JSON to pull out the cheapest entry's
//part listing, price(for each bp), and a link to buy.

//export that data to display 

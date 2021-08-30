const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
var os = require("os");
const url = "http://1min.in/indiapost/pincode/"

var pincodes = fs.readFileSync('pincode_python.csv').toString().split('\n')

pincodes.forEach(function(pincode){
    if(pincode.length == 6) {
        try {
            fetchData(url + pincode).then( (res) => {
                const html = res.data;
                const $ = cheerio.load(html);
                var line = $.html('head title')
                console.log(line)
                fs.appendFileSync('pincode_resolved.txt', line + os.EOL);
            })
        } catch (err) {
            console.log(err)
        }

    }
})


async function fetchData(url){
    console.log("Crawling data...")
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}


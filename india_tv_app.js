const fs = require('fs')
const os = require('os')
const fetch = require('node-fetch')
const readline = require('readline')
const cheerio = require('cheerio')
const Promise = require('bluebird')

var state_district_list = require('./data/district_list.json')

var states = Object.keys(state_district_list)
let fileName = "./data/state_district_url.txt"
let area_list_file = "./data/area_list.txt"
//fs.rmSync('./data/pincodes.txt', {'force' : true})
//fs.rmSync(fileName, {'force' : true})
//fs.rmSync('area_list.txt', {'force' : true})

const fetch_json = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const fetch_html = async (url) => {
    const res = await fetch(url)
    const html = await res.text()
    return html
}

const get_all_urls = () => {
    states.forEach(function(state){
        var districts = state_district_list[state]
        districts.forEach(function(district){
            var line = `/${state.replace('&','AND').toLowerCase().split(' ').join('-')}/${district.replace('&', 'and').toLowerCase().split(' ').join('-')}/`
            fs.appendFileSync(fileName, line + os.EOL)
            let url = "https://www.indiatvnews.com/pincode/ajaxpostofficeload" + line
            fetch_json(url)
                .then(areas => {
                    areas = areas.map(area => { return area.url })
                    area = areas[0]
                    fs.appendFileSync(area_list_file, `${line}${area}` + os.EOL)
                })
                .catch(err => { console.log(err)})
        })
    })
}

const get_pincode = async () => {
    const processed = fs.readFileSync('./data/pincodes.txt').toString().split(os.EOL)
        .map(prefix => {
            return prefix.replace(new RegExp("/[0-9]+"), "")
        })
    //console.log(processed)
    const content = fs.readFileSync(area_list_file).toString().split(os.EOL)
        .filter(prefix => {
            return !processed.includes(prefix) 
        })
    return Promise.map(content, prefix => {
        let url = `https://www.indiatvnews.com/pincode${prefix}`;
        return fetch_html(url)
            .then(html => {
                const $ = cheerio.load(html);
                const meta = $('meta[name="description"]').attr('content')
                fs.appendFileSync('./data/pincodes.log', `${prefix}|${meta}|${os.EOL}`)
                return meta
            })
            .then(content => {
                let pincode = content.match('[0-9]+')[0]
                let data = `${prefix}/${pincode}`
                fs.appendFileSync('./data/pincodes.txt', data + os.EOL)
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }, {concurrency : 5})
    then(_ => { console.log("Done!")})
    .catch(err => {
        console.log(err)
    })
}
// $("body > div:nth-child(5) > div.row.two_column > div.lhs.mb30 > div.lhsBox.maincontent.article.pull-right > div.pin-code-box > div:nth-child(5) > table > tbody")

get_all_urls().then(_ => {
    get_pincode()
}).catch(err => {
    console.log(err)
})

// URL for post offices : https://www.indiatvnews.com/pincode/ajaxpostofficeload/andhra-pradesh/ananthapur
// URL for html content : https://www.indiatvnews.com/pincode/andhra-pradesh/ananthapur/zilladakunta 

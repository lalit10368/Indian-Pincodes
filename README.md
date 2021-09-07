# Indian Pincodes

Nodejs based application to scrape indian pincodes from [india tv site](https://www.indiatvnews.com/india-pin-codes/)

## Install
npm ci

This should install node modules
* node-fetch
* cheerio
* axios
* bluebird

## Usage
`node app.js`

Input Files:
* district_list.json

Output Files:
* data/state_district_url.txt
* data/area_list.txt
* [data/pincodes_raw.txt](https://github.com/lalit10368/Indian-Pincodes/blob/2eb289322a14b785260d4235efc8531906ff27db/data/pincodes_raw.txt)



## Sample data
```
BanaSeppaEast KamengARUNACHAL PRADESH 790102
ChyangtajoSeppaEast KamengARUNACHAL PRADESH 790102
KhenewaSeppaEast KamengARUNACHAL PRADESH 790102
LadaSeppaEast KamengARUNACHAL PRADESH 790102
P.KessangSeppaEast KamengARUNACHAL PRADESH 790102
Pipu dipuSeppaEast KamengARUNACHAL PRADESH 790102
SeijosaSeijosaEast KamengARUNACHAL PRADESH 790103
SeppaSeppaEast KamengARUNACHAL PRADESH 790102
VeoSeppaEast KamengARUNACHAL PRADESH 790102
```

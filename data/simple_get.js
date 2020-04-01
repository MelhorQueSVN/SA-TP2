const axios = require('axios');
const fs = require('fs');

let results = []

let a = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-06-22&enddate=2017-07-21&tp=24'
let b = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-07-22&enddate=2017-08-21&tp=24'
let c = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-08-22&enddate=2017-09-21&tp=24'
let d = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-09-22&enddate=2017-10-21&tp=24'
let e = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-10-22&enddate=2017-11-21&tp=24'
let f = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-11-22&enddate=2017-12-21&tp=24'
let g = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2017-12-22&enddate=2018-01-21&tp=24'
let h = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-01-22&enddate=2018-02-21&tp=24'
let i = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-02-22&enddate=2018-03-21&tp=24'
let j = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-03-22&enddate=2018-04-21&tp=24'
let k = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-04-22&enddate=2018-05-21&tp=24'
let l = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-05-22&enddate=2018-06-21&tp=24'
let m = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-06-22&enddate=2018-07-21&tp=24'
let n = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-07-22&enddate=2018-08-21&tp=24'
let o = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-08-22&enddate=2018-09-21&tp=24'
let p = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-09-22&enddate=2018-10-21&tp=24'
let q = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-10-22&enddate=2018-11-21&tp=24'
let r = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-11-22&enddate=2018-12-21&tp=24'
let s = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2018-12-22&enddate=2019-01-21&tp=24'
let t = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-01-22&enddate=2019-02-21&tp=24'
let u = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-02-22&enddate=2019-03-21&tp=24'
let v = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-03-22&enddate=2019-04-21&tp=24'
let w = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-04-22&enddate=2019-05-21&tp=24'
let x = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-05-22&enddate=2019-06-21&tp=24'
let y = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-06-22&enddate=2019-07-21&tp=24'
let z = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-07-22&enddate=2019-08-21&tp=24'
let aa = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-08-22&enddate=2019-09-21&tp=24'
let bb = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-09-22&enddate=2019-10-21&tp=24'
let cc = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-10-22&enddate=2019-11-21&tp=24'
let dd = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-11-22&enddate=2019-12-21&tp=24'
let ee = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2019-12-22&enddate=2020-01-21&tp=24'
let ff = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2020-01-22&enddate=2020-02-21&tp=24'
let gg = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2020-02-22&enddate=2020-03-21&tp=24'
let hh = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3ad411add2e2404e8b5143606200104&q=Braga, Portugal&format=json&date=2020-03-22&enddate=2020-03-30&tp=24'

const r_a = axios.get(a);
const r_b = axios.get(b);
const r_c = axios.get(c);
const r_d = axios.get(d);
const r_e = axios.get(e);
const r_f = axios.get(f);
const r_g = axios.get(g);
const r_h = axios.get(h);
const r_i = axios.get(i);
const r_j = axios.get(j);
const r_k = axios.get(k);
const r_l = axios.get(l);
const r_m = axios.get(m);
const r_n = axios.get(n);
const r_o = axios.get(o);
const r_p = axios.get(p);
const r_q = axios.get(q);
const r_r = axios.get(r);
const r_s = axios.get(s);
const r_t = axios.get(t);
const r_u = axios.get(u);
const r_v = axios.get(v);
const r_w = axios.get(w);
const r_x = axios.get(x);
const r_y = axios.get(y);
const r_z = axios.get(z);
const r_aa = axios.get(aa);
const r_bb = axios.get(bb);
const r_cc = axios.get(cc);
const r_dd = axios.get(dd);
const r_ee = axios.get(ee);
const r_ff = axios.get(ff);
const r_gg = axios.get(gg);
const r_hh = axios.get(hh);

axios.all([r_a, r_b, r_c, r_d, r_e, r_f, r_g, r_h, r_i, r_j, r_k, r_l, r_m, r_n, r_o, r_p, r_q, r_r, r_s, r_t, r_u, r_v, r_w, r_x, r_y, r_z, r_aa, r_bb, r_cc, r_dd, r_ee, r_ff, r_gg, r_hh]).then(axios.spread((...responses) => {
    results.push.apply(results, responses[0].data.data.weather)
    results.push.apply(results, responses[1].data.data.weather)
    results.push.apply(results, responses[2].data.data.weather)
    results.push.apply(results, responses[3].data.data.weather)
    results.push.apply(results, responses[4].data.data.weather)
    results.push.apply(results, responses[5].data.data.weather)
    results.push.apply(results, responses[6].data.data.weather)
    results.push.apply(results, responses[7].data.data.weather)
    results.push.apply(results, responses[8].data.data.weather)
    results.push.apply(results, responses[9].data.data.weather)
    results.push.apply(results, responses[10].data.data.weather)
    results.push.apply(results, responses[11].data.data.weather)
    results.push.apply(results, responses[12].data.data.weather)
    results.push.apply(results, responses[13].data.data.weather)
    results.push.apply(results, responses[14].data.data.weather)
    results.push.apply(results, responses[15].data.data.weather)
    results.push.apply(results, responses[16].data.data.weather)
    results.push.apply(results, responses[17].data.data.weather)
    results.push.apply(results, responses[18].data.data.weather)
    results.push.apply(results, responses[19].data.data.weather)
    results.push.apply(results, responses[20].data.data.weather)
    results.push.apply(results, responses[21].data.data.weather)
    results.push.apply(results, responses[22].data.data.weather)
    results.push.apply(results, responses[23].data.data.weather)
    results.push.apply(results, responses[24].data.data.weather)
    results.push.apply(results, responses[25].data.data.weather)
    results.push.apply(results, responses[26].data.data.weather)
    results.push.apply(results, responses[27].data.data.weather)
    results.push.apply(results, responses[28].data.data.weather)
    results.push.apply(results, responses[29].data.data.weather)
    results.push.apply(results, responses[30].data.data.weather)
    results.push.apply(results, responses[31].data.data.weather)
    results.push.apply(results, responses[32].data.data.weather)
    results.push.apply(results, responses[33].data.data.weather)

    results.forEach(element => {
        delete element.astronomy
        delete element.maxtempF
        delete element.mintempF
        delete element.avgtempF
        delete element.totalSnow_cm
        delete element.sunHour
        element.humidity = element.hourly[0].humidity
        element.pressure = element.hourly[0].pressure
        element.FeelsLikeC = element.hourly[0].FeelsLikeC
        delete element.hourly
        element.month = new Date(element.date).getMonth() + 1;
        element.city = "Braga"
    });

    console.log(results.length);
    var myJSON = JSON.stringify(results);
    console.log(myJSON);
    fs.writeFile("thing.json", myJSON, function (err, result) {
        if (err) console.log('error', err);
    });
    // use/access the results 
})).catch(errors => {
    // react on errors.
})
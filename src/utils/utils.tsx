/* eslint-disable */
import moment from 'moment'



export function querystring (search:string):any {
    if( search.length === 0 ) return search;
    var query : {[index: string]:any} = {}
    var slice = search.replace('?', '');
    var arr = slice.split('&')
    arr.forEach(function (el) {
        var split = el.split('=');
        query[split[0]] = decodeURIComponent(split[1]);
    });
    return query;
}

export function fromNow (date:string | number) {
    return moment(date).fromNow();
}
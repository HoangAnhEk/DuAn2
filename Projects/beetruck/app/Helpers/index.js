const _ = use('lodash')

function obj2select(obj, value = 'name', key = 'id') {
    let newObj = {}
    _.forEach(obj, (item) => {
        newObj[item[key]] = item[value]
    })
    return newObj
}

function obj2selected(obj, value = 'id') {
    return _.map(obj, (item) => {
        return _.toString(item[value])
    });
}

function numformat(number, n, x) {
    const regex = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(regex, 'g'), '$&.');
}

module.exports = module.exports = {
    obj2select,
    obj2selected,
    numformat
}

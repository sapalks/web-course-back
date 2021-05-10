function deepFilterProperties(json, props) {
    if (Array.isArray(json)) {
        return json.map((item) => deepFilterProperties(item, props));
    }

    if (!isObject(json)) {
        return json;
    }

    const result = {}
    const keys = Object.keys(json);
    for (let k of keys) {
        if (props.indexOf(k) !== -1) {
            continue;
        }
        const value = deepFilterProperties(json[k], props);
        result[k] = value;
    }

    return result;
}

function matchObjects(pattern, obj) {
    if (Array.isArray(pattern)) {
        if (!Array.isArray(obj) || pattern.length !== obj.length) {
            return false;
        }
        const matchedIndecies = new Set();
        for (let po of pattern) {
            let found = false;
            for (let i = 0; i < obj.length; ++i) {
                const item = obj[i];
                if (matchObjects(po, item) && !matchedIndecies.has(i)) {
                    matchedIndecies.add(i);
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }

    if (isObject(pattern)) {
        if (!isObject(obj)) {
            return false;
        }
        const keys = Object.keys(pattern);
        for (let key of keys) {
            if (!matchObjects(pattern[key], obj[key])) {
                return false;
            }
        }
        return true;
    }

    return pattern === obj;
}

function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}

module.exports = {
    matchObjects,
    deepFilterProperties,
    isObject,
}
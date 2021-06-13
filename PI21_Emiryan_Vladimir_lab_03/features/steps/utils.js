const db = require ("../../db")

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
        if(k == 'timeofremind' || k == 'deadline') {
            result[k] = changeDataFormat(value);
            continue;
        }
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

function changeDataFormat(date) {
    date = date.replace(/T/gi, ' ');
    date = date.replace(/:00.000Z/gi, '');
    return date;
}

function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}

async function getDatabaseName() {
    const context = await db.query("SELECT current_database ();");
    const name = context.rows[0]['current_database'];
    return name;
}

async function containsThisTask(taskTheme) {
    const context = await db.query(`SELECT * FROM task where theme = $1`, [taskTheme]);
    if(context.rows.length > 0) {
        return true;
    }
    return false;
}

async function containsThisStep(stepTheme) {
    const context = await db.query(`SELECT * FROM step where theme = $1`, [stepTheme]);
    if(context.rows.length > 0) {
        return true;
    }
    return false;
}

async function isNotEmptyTaskTable() {
    const context = await db.query(`SELECT * FROM task`);
    return true ? context.rowCount > 0 : false;
}

async function isNotEmptyStepTable() {
    const context = await db.query(`SELECT * FROM step`);
    return true ? context.rowCount > 0 : false;
}

module.exports = {
    matchObjects,
    deepFilterProperties,
    isObject,
    changeDataFormat,
    getDatabaseName,
    isNotEmptyTaskTable,
    containsThisTask,
    containsThisStep,
    isNotEmptyStepTable
}
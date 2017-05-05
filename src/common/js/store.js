export function saveToLocal(id, key, value) {
    let seller = window.localStorage.__seller__;  // __表示私有的
    if (!seller) {  // 从来没有创建过seller，把seller存为{}
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);  // localStorage存储字符串，JSON
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {  // 读取不到，默认def
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];  // 因为存储的是JSON字符串，所以要用JSON.parse转化成JSON对象
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
};

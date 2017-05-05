/**
 * 解析url参数
 * @example ?id=1234&a=b   window.location.search获得 [?&]匹配?,[^?&]+匹配id
 * return Object {id:1234, a:b}
 */
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // 这个数组拿到['?id=1234', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');  // 去掉第一个符号
            let key = decodeURIComponent(tempArr[0]);  // url参数，要调用这个方法
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;  // 转化为对象
        });
    }
    return obj;
};

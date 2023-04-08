export class ObjectUtils {

  static getKeyValuePair(object: Object){
    if(!object || Object.keys(object).length <= 0) return;
    let keyValuePairList = [];
    for (const [key, value] of Object.entries(object)) {
      keyValuePairList.push({key:key, value: value});
    }
    return keyValuePairList;
}
}

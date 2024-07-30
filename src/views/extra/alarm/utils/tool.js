import * as XLSX from 'xlsx';
/*
4  * @description:
5  * @param {Object} json 服务端发过来的数据
6  * @param {String} name 导出Excel文件名字
7  * @param {String} titleArr 导出Excel表头
8  * @param {String} sheetName 导出sheetName名字
9  * @return:
10  */
function exportExcel(json, name, titleArr, sheetName) {
  /* convert state to workbook */
  const data = [];
  const keyArray = [];
  const getLength = function (obj) {
    let count = 0;
    for (const i in obj) {
      // if (obj.hasOwnProperty(i)) {  => error  Do not access Object.prototype method 'hasOwnProperty' from target object  no-prototype-builtins
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        count++;
      }
    }
    return count;
  };
  for (const key1 in json) {
    // if (json.hasOwnProperty(key1)) {
    if (Object.prototype.hasOwnProperty.call(json, key1)) {
      const element = json[key1];
      const rowDataArray = [];
      for (const key2 in element) {
        // if (element.hasOwnProperty(key2)) {
        if (Object.prototype.hasOwnProperty.call(element, key2)) {
          const element2 = element[key2];
          rowDataArray.push(element2);
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2);
          }
        }
      }
      data.push(rowDataArray);
    }
  }
  // keyArray为英文字段表头
  data.splice(0, 0, keyArray, titleArr);
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  // 此处隐藏英文字段表头
  const wsrows = [{ hidden: true }];
  ws['!rows'] = wsrows; // ws - worksheet
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  /* generate file and send to client */
  XLSX.writeFile(wb, name + '.xlsx');
}

export { exportExcel };

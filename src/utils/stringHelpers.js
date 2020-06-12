export const labelWrapFormatter = function(params) {
  //粘贴以下function内未注释的代码
  var newParamsName = ''; // 最终拼接成的字符串
  var paramsNameNumber = params.length; // 实际标签的个数
  var provideNumber = 6; // 每行能显示的字的个数
  // var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
  var rowNumber = 3;

  // 条件等同于rowNumber>1
  if (paramsNameNumber > provideNumber) {
    for (var p = 0; p < rowNumber; p++) {
      var tempStr = ''; // 表示每一次截取的字符串
      var start = p * provideNumber; // 开始截取的位置
      var end = start + provideNumber; // 结束截取的位置
      // 此处特殊处理最后一行的索引值
      if (p === rowNumber - 1) {
        // 最后一次不换行
        tempStr = params.substring(start, paramsNameNumber);
      } else {
        // 每一次拼接字符串并换行
        tempStr = params.substring(start, end) + '\n';
      }
      newParamsName += tempStr; // 最终拼成的字符串
    }
  } else {
    // 将旧标签的值赋给新标签
    newParamsName = params;
  }
  //将最终的字符串返回
  return newParamsName;
};

jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('mobile.app.record.index.show', function() {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    // console.log('config: ' + config.colors.length);
    if (config.colors.length == 0) {
      throw new Error('The header element is unavailable on this page');
    }

    //configの値を取得する
    var $array = config.colors.split(',');
    var $colorArray = [];
    while ($array.length) $colorArray.push($array.splice(0, 4));
    // console.log($appButtonsArray);

    //一覧画面でステータスがキャンセルの時背景色を変更
    for(var i=0; i<$colorArray.length; i++) {
      var value = 'value-' + $colorArray[i][1];
      // console.log(value);
      var eles = document.getElementsByClassName(value);
      var elesArray = Array.from(eles);
      // console.log('条件' + $colorArray[i][3]);
      elesArray.forEach(function(ele){
        switch($colorArray[i][3]) {
          case '完全一致':
            if(ele.textContent == $colorArray[i][2]) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
          case '部分一致':
            if(ele.textContent.indexOf($colorArray[i][2]) >= 0) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
          case '以上':
            if(Number(ele.textContent) >= Number($colorArray[i][2])) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
          case '以下':
            if(Number(ele.textContent) <= Number($colorArray[i][2])) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
          case 'より上':
            if(Number(ele.textContent) > Number($colorArray[i][2])) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
          case 'より下':
            if(Number(ele.textContent) < Number($colorArray[i][2])) {
              ele.parentElement.style.backgroundColor = $colorArray[i][0];
            }
            break;
        }
      });
    }
  });
})(jQuery, kintone.$PLUGIN_ID);

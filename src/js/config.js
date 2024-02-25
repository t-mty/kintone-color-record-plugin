jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  if (!($form.length > 0 && $cancelButton.length > 0)) {
    throw new Error('Required elements do not exist.');
  }

  //既存のデータを取得して二次元配列にする
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  var $colorArray = [];    
  if (!config.colors) {
    $colorArray = [[]]; 
  } else {
    var $array = config.colors.split(',');
    while ($array.length) $colorArray.push($array.splice(0, 4));
    // console.log($colorArray);
  }

  //サブテーブルを初期配置する
  for(var i=0; i<$colorArray.length-1; i++) {
    var $firstRow = $('tbody tr').eq(-1);
    var $newRow = $firstRow.after('<tr></tr>').next('tr');

    $newRow.append('<td><div class="kintoneplugin-table-td-control td-1"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text color-code" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control td-2"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text value-code" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control td-3"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text indexof-text" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-select-outer td-4"><div class="kintoneplugin-select"><select><option>完全一致</option><option>部分一致</option><option>以上</option><option>以下</option><option>より上</option><option>より下</option></select></div></div></td>');
    $newRow.append('<td class="kintoneplugin-table-td-operation"><button type="button" class="kintoneplugin-button-add-row-image" title="Add row"></button> <button type="button" class="kintoneplugin-button-remove-row-image" title="Delete this row"></button></td>');
  }

  //サブテーブルに設定済みの値を入れる
  var tr = $("tbody tr");//テーブルの全行を取得
  for( var i=0; i<tr.length; i++){
    var td = tr.eq(i).children(); //1行目から順番に列を取得(th、td)
    for( var j=0; j<td.length-1; j++ ){
      // if( typeof data[i] == "undefined" ) data[i] = [];
      if(j == 3) {
        switch($colorArray[i][j]) {
          case '完全一致':
            td.eq(j).find('select').find('option').eq(0).attr('selected', 'selected'); //値をセットする
            break;
          case '部分一致':
            td.eq(j).find('select').find('option').eq(1).attr('selected', 'selected'); //値をセットする
            break;
          case '以上':
            td.eq(j).find('select').find('option').eq(2).attr('selected', 'selected'); //値をセットする
            break;
          case '以下':
            td.eq(j).find('select').find('option').eq(3).attr('selected', 'selected'); //値をセットする
            break;
          case 'より上':
            td.eq(j).find('select').find('option').eq(4).attr('selected', 'selected'); //値をセットする
            break;
          case 'より下':
            td.eq(j).find('select').find('option').eq(5).attr('selected', 'selected'); //値をセットする
            break;
        }
      } else {
        td.eq(j).find('input').val($colorArray[i][j]); //値をセットする
      }
    }
  }

  //テーブルの行削除ボタンを押したとき
  $('tbody').on('click', '.kintoneplugin-button-remove-row-image', 
  function removeRow() {
    var tr = $("tbody tr");
    if(tr.length > 1) {
      $(this).closest('tr').remove();
    }
  });

  //テーブルの行追加ボタンを押したとき
  $('tbody').on('click', '.kintoneplugin-button-add-row-image', 
  function addRow() {
    var $nowRow = $(this).closest('tr');
    var $newRow = $nowRow.after('<tr></tr>').next('tr');
    // console.log('row: ' & $nowRow.index(this));

    $newRow.append('<td><div class="kintoneplugin-table-td-control td-1"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text color-code" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control td-2"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text value-code" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control td-3"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text indexof-text" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-select-outer td-4"><div class="kintoneplugin-select"><select><option>完全一致</option><option>部分一致</option><option>以上</option><option>以下</option><option>より上</option><option>より下</option></select></div></div></td>');
    $newRow.append('<td class="kintoneplugin-table-td-operation"><button type="button" class="kintoneplugin-button-add-row-image" title="Add row"></button> <button type="button" class="kintoneplugin-button-remove-row-image" title="Delete this row"></button></td>');
  });

  //保存ボタンを押したとき
  $form.on('submit', function(e) {
    e.preventDefault();
    var data = [];
    var tr = $("tbody tr");//テーブルの全行を取得
    for( var i=0; i<tr.length; i++){
      var td = tr.eq(i).children(); //1行目から順番に列を取得(th、td)
      for( var j=0; j<td.length-1; j++ ){
        if( typeof data[i] == "undefined" ) data[i] = [];
        if(j == 3) {
          var select = td.eq(j).find('select');
          data[i][3] = select.val();
        } else {
          data[i][j] = td.eq(j).find('input').val(); //i行目j列の文字列を取得
        }
      }
      if(data[i][0]=='' && data[i][1]=='') {
        delete data[i];
      }
    }
    var colorConfig = data.join();
    // console.log(colorConfig);
    kintone.plugin.app.setConfig({
      colors: colorConfig
    }, function() {
      // alert('The plug-in settings have been saved. Please update the app!');
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  });

  //キャンセルボタンが押されたとき
  $cancelButton.on('click', function() {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);

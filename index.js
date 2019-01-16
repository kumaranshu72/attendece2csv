var pdfreader = require('pdfreader');

var rows = {}; // indexed by y-position
var xrows = {}; // indexed by x-position
var row_no = 0;
var days = false;
var prev_x, prev_data,x_pos;
var summary = ''

function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
  .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
  .forEach((y) => {
    if(row_no <  4) {
      console.log((rows[y] || []).join(' '))
    }
    if(rows[y]=='Days' && !days) {
      console.log((rows[y] || []).join(' '),",",prev_data.join(','))
      console.log("")
      x_pos = prev_x;
      days = true;
    }
    if(rows[y]=='Status') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='InTime') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='OutTime') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='Duration') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='Late By') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='Early By') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y]=='Shift') {
      let temp = [];
      x_pos.forEach(function(x){
        let i = prev_x.indexOf(x)
        if(i!=-1){
          temp.push(prev_data[i])
        }
        else{
          temp.push(" ")
        }
      })
      console.log((rows[y] || []).join(' '),",",temp.join(','))
    }
    if(rows[y][0]=='Employee:') {
      console.log((rows[y] || []).join(' '),prev_data.join(' '))
    }
    if(prev_data == 'Shift'){
      summary = (rows[y] || []).join(' ');
    }
    if(prev_data == 'Employee:'){
      console.log((rows[y] || []).join(' '),summary)
      console.log(" ")
    }
    prev_x = xrows[y]
    prev_data = rows[y]
    row_no++;
  });
}

new pdfreader.PdfReader().parseFileItems('read.pdf', function(err, item){
  if (!item || item.page) {
    // end of file, or page
    printRows();
    //console.log('PAGE:', item.page || " ");
    rows = {}; // clear rows for next page
    xrows = {};
  }
  else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
    (xrows[item.y] = xrows[item.y] || []).push(item.x);

  }
});

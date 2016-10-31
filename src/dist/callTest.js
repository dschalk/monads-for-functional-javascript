



function stripchars(string, chars) {
  return string.replace(RegExp('['+chars+']','g'), '');
}

var a = 'abcdefghijk'

var jack = ['abcdef', 'carsandbuses']

function j (x) {
  var t = 'teddy'
  x.some(v => {
    if (v.startsWith('abc')) {
      t = stripchars(v,'abc');
    }
  console.log(t);  
  return t;
  })
var c = j(jack)
}

j(jack);

console.log('You bet!');

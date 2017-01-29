















onmessage = function(ar) {
  var [prState, nums, decompState] = ar.data;
  var n = 0;
  importScripts('script2.js');
  var res;
  var a = nums[0];
  var b = nums[1];
  var max = a > b ? a : b
  var c = decompState[3];
  var d = c.length;
  var diff = max - d;
  execD(decompState, prState, max, a, b)
}




WORKS:

function MonadE (val, ID, er = []) {
  var x = val;
  var e = er;
  var ob = {
    id: ID,

    bnd: function (f, ...args) {

      if (f == 'clean') return ret2(x, ob.id, []);

      if (e.length > 0) {
        console.log('BYPASSING COMPUTATION ', f, args, ' PROPAGATING ERROR: ', e[0], ' In MonadE instance: ', ob.id ); 
        return new MonadE(x, ob.id, e)
      }
      else {
      var result = 0;
      var func; 
      try {func = eval(f)}
      catch(error) {
        console.log('In MonadE instance ' + ob.id + ' ERROR:', error );
        e.push(error);
        // return new MonadE(x, ob.id, e);
        return ob;
      }}
      if ( args.some( v => v == undefined) ) {
        e.push("undefined argument");
        console.log('In MonadE instance ' + ob.id + ' ERROR: undefined argument. ' );
        return ob;
        // return new MonadE(x, ob.id, e);
      }
      else {
        try {result = func(x, ... args )} 
        catch (error) {
          e.push(error);
          console.log(error, ' in MonadE instance ', ob.id, ' ', ' ERROR is ', error );
        return ob;
        //  return new MonadE (x, ob.id, e);
        }
      }
      if (result == undefined || result == NaN) {
        e.push("The result in MonadE instance ", ob.id, " is undefined or NaN");
        return new MonadE(x, ob.id, e)
      }
      return result;
    },

    ret: function (a) {
      window[ob.id] =  new MonadE(a, ob.id);
      return window[ob.id];
    }  
  };
  return ob;
}




      var a = eval(b);
      if (e.length > 0) {
        console.log('BYPASSING COMPUTATION ', f, args, ' PROPAGATING ERROR: ', e[0], ' Now in the run() method of MonadE instance: ', ob.id ); 
        return ob;
      }
      if (a == undefined)  {
        e.push("ret rejected an undefined argument");
        console.log('In the run() MonadE instance ' + ob.id + ' ERROR: ret() rejected an undefined argument. ' );
        return ob;
      }
      if (a == NaN) {
        e.push("ret rejected the argument NaN");
        console.log('In the run() MonadE instance ' + ob.id + ' ERROR: ret() rejected the argument NaN. ' );
        return ob;
      }



function evalF(x) {
  if (typeof x == "string") x = "typeof " + x
  return eval(x);
}

function MonadE (val, ID, er = []) {
  var x = val;
  var e = er;
  var ob = {
    id: ID,

    bnd: function (f, ...args) {

      if (f == 'clean') return ret2(x, ob.id, []);

      if (e.length > 0) {
        console.log('BYPASSING COMPUTATION ', f, args, ' PROPAGATING ERROR: ', e[0], ' In MonadE instance: ', ob.id ); 
        return new MonadE(x, ob.id, e)
      }
      else {
        var result = 0;
        var func;
        if (args.lenth > 0) {  
          var ar;
          try (let v of ar) {
            if (eval(v) 
          catch (error) {
            e.push(error)
            return ob;
          };
          for (let k in ar) {
            if (ar[k] == NaN) { 
              e.push(ar[k] + "is  NaN");
              console.log('In MonadE instance ' + ob.id + ' ERROR: ar[k] +  is NaN. ' );
              return ob;
            }
            if ( ar.some( v => v == NaN) ) {
              e.push("Rejecting NaN in bnd in " + ob.id);
              console.log('In MonadE instance ' + ob.id + ' ERROR: Argument is NaN. ' );
              return ob;
            }
          }
        }
        try {result = func(x, ... ar )} 
        catch (error) {
          e.push(error);
          console.log(error, ' in MonadE instance ', ob.id, ' ', ' ERROR is ', error );
          return ob;
        }
        if (result == undefined || result == NaN) {
          e.push("The result in MonadE instance ", ob.id, " is undefined or NaN");
          return ob;
        }
        try {func = eval(f)}
        catch(error) {
          console.log('In MonadE instance ' + ob.id + ' ERROR:', error );
          e.push(error);
          return ob;
        }
      }
      return result;
    },

    ret: function (a) {
      window[ob.id] =  new MonadE(a, ob.id);
      return window[ob.id];
    }  
  };
  return ob;
}


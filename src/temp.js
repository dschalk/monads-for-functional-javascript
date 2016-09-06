
  h('p', ' Each of the functions shown above can be used as a stand-alone function or as an argument to the bnd() method. Each monad in a chain of linked computations can do one of two things with the previous monad\s value: (1) It can ignore it, possibly letting it move past for use further down the chain or (2) use it, with the option of passing it and/or the computation result on down the chain. ' ), 
  h('h3', ' The Monad Laws '), h('p', ' In the following discussion, "x == y" signifies that x == y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad m with references matching their ids; that is, with m[id] == m.id. M is defined as the collection of all such instances of Monad along and all of the functions in F. We speculate that there is a one to one correspondence between monads in Hask (The  For any m (with id == "m"), f, and f\' in M, J, F, and F, respectively, the following relationships hold: '), h('dib.bh3', 'Left Identity ' ),
  h('pre.lb', `  equals( m.ret(v).bnd(f), f(v) )   
  equals( ret(v).bnd(f), f(v) ) 
  Examples: equals( m.ret(3).bnd(cube), cube(3) )  Tested and verified  
            equals( ret(3).bnd(cube), cube(3)      Tested and verified
  Haskell monad law: (return x) >>= f \u2261 f x  ` ),
                h('div.bh3', ' Right Identity  ' ),  
  h('pre.lb', `  m.bnd(m.ret) === m      Tested and verified 
  m.bnd(ret, "m") === m   Tested and verified
  equals(m.bnd(ret), m)   Tested and verified
  Haskell monad law: m >>= return \u2261 m `  ),
                    h('div.bh3', ' Commutivity  ' ),  
                    h('pre.lb', `  equals( m.bnd(f1).bnd(f2), m.bnd(v => f1(v).bnd(f2)) ) 
  Example: equals( m.ret(0).bnd(add, 3).bnd(cube), 
           m.ret(0).bnd(v => add(v,3).bnd(cube)) )  Tested amd verified
  Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) `),
                    h('p', ' where equals is defined as: '),
                    code.equals,
                    h('p', ' The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and equivalence of methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory and the == operator returns false. So we expect m.ret(3) == m.ret(3) to return false. What concerns us is the equivalence of both sides of a comparison; that is, can the left side be substituted for the right side and vice versa.  '),
  h('p', ' Tests in the JS-monads-mutableInstances branch at the Github repository produce results closer to what we would expect in mathematics. For example: m.ret(7) == m.ret(7) returns true in JS-monads-mutableIntances but false in JS-monads-stable, the master branch. But it would be folly to give up immutability for the sake of making unimportant comparisons come out "right". equals(m.ret(7), m.ret(7)) tells us that m.ret(7) is doing the same thing on both sides of the comparison, and that is all that is important. Similarly, equals(ret(3).bnd(cube), cube(3)) tells us that ret(3).bnd(cube) and cube(3) are doing the same thing; they can be substituted for one another. In Haskell, x ≡ y means that you can replace x with y and vice-versa, and the behaviour of your program will not change. That is what "equals(x, y)" means in the context of demonstrating that instances of Monad in M obey the Javascript equivalent of the Haskell monad laws. The behavior of Instances of Monad with ret() (the function and the method) and bnd() mirrors the behavior of Haskell monads with return and >>=. This doesn\'t prove anything, but I find it reassuring.  ' ),
                    h('span', ' Haskell monads are not category theory monads. They don\'t even exist in a category. See: ' ),                     
                    h('a', { props: { href:"http://math.andrej.com/2016/08/06/hask-is-not-a-category", target: "_blank" }}, ' Hask is not a category '),
                    h(
  
  h('h3', ' Back to the master branch '),
  h('h3', ' fmap '),
  h('p', ' I showed you (abpve) some functions designed for instances of Monad, but it is easy to lift functions that return ordinary Javascript values into chains of monadic computations. One way of doing this is to use fmap(), as shown below in finding solutions to the quadratic equation.  '),
  h('h3', ' Monad Arithmetic with opM '),
  code.opM,
  h('p', ' Since the Monad instance ok had already been created, the second result could have been obtained by running: '),

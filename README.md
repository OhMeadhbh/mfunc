mfunc
=====

Meadhbh's FUNCtional programming library in javascript

This is a simple module that works with node & browsers to add simple
functional programming primitives. These are no better than ones
provided by other languages, they're just in a format I like to use.

This module adds:

*Function.prototype._$partial( args )* - this function returns a function
which pre-applies some number of arguments. Here's an example cribbed from
http://dailyjs.com/2012/09/14/functional-programming/ :

<pre>function add(x,y) { return x+y; };
var add_three = plus_two.$_partial(3);
console.log( add_three(4) ); // this should print the number 7</pre>

*Function.prototype._$compose( function )* - this function returns a function
which executes the base function (the thing you do the _$compose() on) on the
output of the function you pass as a parameter to _$compose(). Example:

<pre>function add2( x ) { return 2+x; }
function mult2( x ) { return 2*x; };
var add_then_mult = mult2._$compose( add2 );
console.log( add_then_mult( 7 ) ); // should print the number 18</pre>

*Function.prototype._$flip()* - returns a function whose arguments are
reversed.

<pre>function div(x,y) { return x/y; }
var recip = div._$flip();
console.log( div( 10, 5 ) ); // should print the number 2
console.log( recip( 10, 5 ) ); // should print the number 0.5</pre>

*Function.prototype._$negate()* returns a function whose value is
the logical negation of the original.

<pre>function isTwo( x ) { return 2 == x; }
var isNotTwo = isTwo._$negate();
console.log( isTwo( 1 ) ); // should print false
console.log( isTwo( 2 ) ); // should print true
console.log( isNotTwo( 1 ) ); // should print true
console.log( IsNotTwo( 2 ) ); // should print false</pre>

*Array.prototype._$each(function)* and *Object.prototype._$each(function)*
Iterates through array calling the function passed for each value passing
the element and the index as parameters. 'this' is set as the array
(or object).

*Array.prototype._$map(function)* and *Object.prototype._$map(function)*
Iterates through each element of the array (or object), creating a new array
(or object) whose elements are the contents of the original array passed
through the function provided.

*Object.prototype._$fold( function, base )* Iterates through the object's members
combining the output of the value returned from the function provided with the
base value specified.
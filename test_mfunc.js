require( './mfunc' );

var a = new Array( 10 );
a._$each( function( e, i ) { this[i] = i*i; } );
console.log( a );
console.log( a._$fold( function( e, base ) { return base + e; } ) );
console.log( [1,2,3]._$fold( function( e, base ) { return base + e; } ) );

var b = {
  "one": true,
  "two": 42.1,
  "three": "four",
  "five": [ "six", "seven" ],
  "eight": { "nine": false, "ten": 11 }
};

b._$each( function( e, i ) {
  if( 'string' == typeof e ) {
    this[i] = this[i].toUpperCase();
  }
} );
console.log( b );
console.log( b._$fold( function( n, old ) { return  old + n; }, "" ) );
console.log( b._$fold( function( n, old ) { return  old + n; } ) );

var plus = function( x, y ) { return x + y; };
var add_three = plus._$partial( 3 );
a._$each( function( e,i ) { this[i] = add_three(e);} );
console.log( a );

var greet = function( s ) { return "Hi, " + s; };
var exclaim = function( s ) { return s + '!'; };
var excited_greeting = greet._$compose( exclaim );
console.log( excited_greeting( "Meadhbh" ) );

var div = function( x, y ) { return x / y; };
console.log( div(1,2) );
console.log( div._$flip()(1,2) );
var jointhis = function( n, s ) {
  return n._$fold( function( e, c ) { return c + s + e; } );
};
console.log( a );
console.log( jointhis( a, "," ) );
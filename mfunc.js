// Copyright (c) 2013 Meadhbh S. Hamrick, All Rights Reserved
//
// I tried to like underscore; I really, really did. But it struck me as being
// wrong in so many different ways. So... here's my own set of duck-punches
// to support functional programming.

( function () {
  Array.prototype._$each = function( _f ) {
    for( var i = 0, il = this.length; i < il; i++ ) {
      _f && _f.call( this, this[i], i );
    }
  };

  Array.prototype._$map = function( _f ) {
    var return_value = [];
    _f && this._$each( function( e, i ) {
      return_value.push( _f.call( this, e ) ); 
    } );
    return return_value;
  };

  Object.prototype._$each = function( _f ) {
    for( var i in this ) {
      _f && this.hasOwnProperty(i) && _f.call( this, this[i], i );
    }
  };

  Object.prototype._$fold = function( _f, base ) {
    base = ("undefined" != typeof base)?base:0;
    this._$each( function( e, i ) {
      base = _f.call( this, e, base );
    } );
    return base;
  };

  Object.prototype._$map = function( _f ) {
    var return_value = {};
    _f && this._$each( function( e, i ) {
      return_value[i] = _f.call( this, e );
    } );
    return return_value;
  };

  Function.prototype._$negate = function ( _f ) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      console.log( args );
      return ! _f.apply( this, args );
    }
  };

  Function.prototype._$partial = function () {
    var args = Array.prototype.slice.call(arguments);
    var _f = this;
    return function() {
      return _f.apply(this, args.concat( Array.prototype.slice.call( arguments ) ) );
    }
  };

  Function.prototype._$compose = function ( _g ) {
    var _f = this;
    return function () {
      return _f.call( this, _g.apply( this, Array.prototype.slice.call( arguments ) ) );
    };
  };

  Function.prototype._$flip = function () {
    var _f = this;
    return function () {
      return _f.apply( this, Array.prototype.slice.call( arguments ).reverse() );
    };
  };
} ) ();

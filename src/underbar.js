(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n == 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(value) {
      if (test(value)) {
        result.push(value);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // use _.each
    var result = [];

    _.each(array, function(value) {
      if(!(result.includes(value))) {
        result.push(value);
      }
    });

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(value) {
      result.push(iterator(value));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // Check arguments length
    if (arguments.length < 3) {
      var accumulator = collection[0];
      // Slice collection
      collection = collection.slice(1);

      // Why does anonymous function only have one parameter??
      _.each(collection, function(number) {
        accumulator = iterator(accumulator, number);
      });

    } else {
      _.each(collection, function(number) {
        accumulator = iterator(accumulator, number);
      });
    };

    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    /// What is wasFound?
    /// Function to find

    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    /// If I find one false then always return false
    /// e.g.
    /// [1, 2, 3]
    /// function(value) { return value == 3 };

    /// Create variable to hold arguments.length
    /// Tried to call arguments.length inside anonymous function but did not work

    var argumentsLength = arguments.length;

    return _.reduce(collection, function(accumulator, value) {
      /// console.log('accumulator', accumulator);
      /// console.log('current', iterator(value));
      if(argumentsLength == 1) {
        return !_.contains(collection, false);
      }
      if(!accumulator || !iterator(value)) {
        return false;
      }
      return true;
      /// Why doesn't this work??
      /// return accumulator && iterator(value);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  /// every vs some
  /// every checks whether all elements are truthy
  /// some just checks if one element is truthy
  
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    /*var argumentsLength = arguments.length;

    return _.reduce(collection, function(accumulator, current) {
      if (argumentsLength == 1) {
        return _.contains(collection, true) ? true : false;
      }
      /// console.log('accumulator', accumulator);
      /// console.log('current', iterator(current));
      /// return accumulator || iterator(current);
      if(accumulator || iterator(current)) {
        return true;
      }
      return false;
    }, false);*/
    if (arguments.length < 2) {
      return _.contains(collection, true);
    }
    return !_.every(collection, function(element) {
      return !iterator(element);
    })
    
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    /// Use arguments
    /// _.each(collection, iterator)

    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        obj[key] = value;
      });
    }

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        if (!(key in obj)) {
          obj[key] = value;
        }
      });
    }

    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    /// arguments
    /// store all arguments in arrays
    /// need to store func's parameters
    /// storage is unique to func i.e. stores every single call's information
    /// myParameters will change depending on current func call

    var storage = {};
    /// Why hold result variable here?

    return function() {
      var myParameters = JSON.stringify(arguments);

      if(!storage[myParameters]) {
        storage[myParameters] = func.apply(this, arguments);
      }
      return storage[myParameters];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var myParameters = Array.from(arguments).slice(2);
    /// This doesn't work below because func.apply calls the function and want to delay it
    /// return setTimeout(func.apply(this, myParameters), wait);
    /// So hide function in another function
    var delayedFunc = function() {
      return func.apply(this, myParameters);
    }
    return setTimeout(delayedFunc, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = [];

    /// Use Math.random for array
    /// Check if index is used yet
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /// Have to make sure random index is unique

    var randomIndex;
    var checkUniqueIndex = {};

    while (result.length < array.length) {
      /// This while loop makes sure result array is same length as argument array
      randomIndex = getRandomInt(0, array.length - 1);
      /// Need to make sure random index is unique
      /// How do I check if random index was already used
      if (!checkUniqueIndex[randomIndex]) {
        result.push(array[randomIndex]);
        checkUniqueIndex[randomIndex] = true;
      }
    }

    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // console.log(functionOrKey);
    
    return _.map(collection, function(element) {
      if (typeof functionOrKey == 'function') {
        return functionOrKey.apply(element, args);
      } else {
        // console.log(typeof functionOrKey);
        // console.log(element[functionOrKey]);
        // convert string to method
        return element[functionOrKey]();
      }
    });

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    ///// use sort and invoke and pluck
    /// sort

    /// iterator can be function or string
    /// collection could contain objects or numbers

    /*function checkCollection(type) {
      var iteratedArray = _.map(collection, iterator);
      return _.some(iteratedArray, function(element) {
        return typeof element == type;
      })
    }*/

    if (typeof iterator == 'function') {
      // don't understand a - b
      return collection.sort(function(a, b) {
        return iterator(a) - iterator(b);
      });
    } else if (typeof iterator == 'string') {
      return collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      });
    }


    // try using reduce here!!
    /* var result = [];
    var inputArray = collection;
    inputArray.sort();
    //console.log(collection);

    /// Need to compare every element in array
    /// for loop or each
    /// use unique and reduce
    /// pluck returns array with specific key
    
    // var i, j;
    /// i represents current element
    /// j represents comparing element

    var allUndefined = function(array) {
      return _.every(array, function(element) {
        return element === undefined;
      });
    }

    /// might have to use reduce
    /// need to use splice on inputArray
    /*while (result.length < collection.length) {

      _.each(inputArray, function(currentElement, i) {
        // if one element left in inputArray no need to loop
        var elementInOrder;
        var index;
        _.each(inputArray, function(comparedElement) {

          if (allUndefined(inputArray) || inputArray.length == 1 || iterator(currentElement) < iterator(comparedElement)) {
            elementInOrder = currentElement
            index = i;
          }
        });
        if (elementInOrder != undefined) {
          // console.log(elementInOrder);
          console.log('element' , JSON.stringify(elementInOrder));
          console.log('index', index);
          result.push(elementInOrder);
          // splice inputArray
          console.log('before splice', JSON.stringify(inputArray));
          inputArray.splice(index, 1);
          console.log('after splice', JSON.stringify(inputArray));
          console.log('END');
        } else if (allUndefined(inputArray)) {
          result.push(elementInOrder);
          inputArray.splice(index, 1);
        }
      })*/

      /*if (iterator(inputArray[i]) < iterator(inputArray[j])) {
        i++;
      } else {
        j++;
      }*/

      // reduce collection to
    //}

    // return result;*/

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // arguments length is variable
    // check length of arguments
    var result = [];

    var longestParameter = _.reduce(arguments, function(accumulator, current) {
      if (current.length > accumulator.length) {
        return current;
      }
      return accumulator;
    }, arguments[0]);

    var length = longestParameter.length;

    for (var i = 0; i < length; i++) {
      var nest = [];
      _.each(arguments, function(parameterArray, index) {
        nest.push(parameterArray[i]);
      });
      // console.log(JSON.stringify(nest));
      result.push(nest);
    }

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // var result = [];
    // function flat(array) {
    //   /*return _.reduce(nestedArray, function(accumulator, current) {
    //     if (!Array.isArray(current)) {
    //       return current;
    //     }
    //   });*/
    //   _.each(array, function(element) {
    //     // base case
    //     if (!Array.isArray(element)) {
    //       result.push(element);
    //     }
    //     flat(element);
    //   });
    // }

    // // recursion;

    // flat(nestedArray);

    // return result;

    var results = [];

    _.each(nestedArray, function(element) {
      // base case
      if (!Array.isArray(element)) {
        results.push(element);
      }
      // recursive case
      else {
        // debugger;
        results = results.concat(_.flatten(element));
      }
    });

    return results;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    // number of parameters is variable so use arguments

    // can use some here to see if other parameters contain element
    var i = 0; // arguments

    while (i < arguments.length) {
      //console.log(JSON.stringify(arguments));
      var j = 0; // nested
      // look at arguments[i][j] and see if arguments[i + 1]
      // once loop finds another parameter contains element then break out of loop
      while (j < arguments[i].length) {
        // console.log(arguments[i][j]);
        var t = i + 1; // comparing internal index
        while (t < arguments.length) {
          // console.log(arguments[i][j]);
          if (_.contains(arguments[t], arguments[i][j])) {
            result.push(arguments[i][j]);
          }
          t++;
        }
        j++;
      }
      i++;
    }

    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // var result = arguments[0];
    // // var collectionToCallEachOn = arguments[0];
    // var calledFuncArguments = arguments;

    var firstParameter = arguments[0];

    /// Need to use apply because arguments is an array and not an argument list!!!
    var intersectionArray = _.intersection.apply(null, arguments);

    return _.filter(firstParameter, function(element) {
      return !_.contains(intersectionArray, element);
    });

    // console.log('intersectionArray: ', JSON.stringify(intersectionArray));
    // console.log('firstParameter: ', JSON.stringify(firstParameter));

    /*while (i < arguments.length) {
      _.each(result, function(element, index) {
        console.log(element);
        if (_.contains(arguments[i], element)) {
          console.log('trigger');
          result.splice(index, 1);
        }
        i++;
      })
    }*/
    // var count = 1;

    /*_.each(collectionToCallEachOn, function(element, index) {
      var i = 1;
      console.log('collection: ', JSON.stringify(collectionToCallEachOn));
      // console.log('count: ', count);

      while (i < calledFuncArguments.length) {
        // console.log('index: ', i);
        console.log('result', JSON.stringify(result));
        // console.log('length', calledFuncArguments.length);
        console.log('current element', element);
        console.log('compared array: ', JSON.stringify(calledFuncArguments[i]));
        if (_.contains(calledFuncArguments[i], element)) {
          console.log('before splice', JSON.stringify(result));
          // original array is messed up after SPLICE
          // index might be causing bug
          result.splice(index, 1); // this is causing BUG in code
          console.log('after splice', JSON.stringify(result));
        }
        console.log('end');
        i++;
      }

      // count++;
    })

    console.log('END');
    
    return result;*/
  };



  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

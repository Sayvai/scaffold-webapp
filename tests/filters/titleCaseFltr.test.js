describe('titleCaseFltr -->', function() {

  var filter;

  beforeEach(module('app'));

  beforeEach(inject(function(_$filter_){
    var $filter = _$filter_;
    filter = $filter('titleCase');
  }));

  beforeEach(function(){
    
  });

  describe('[1] with valid inputs -->', function() {
    
    it('[1.1] returns a single title-cased word from lower-case word input', function() {
      expect(filter('production')).toEqual('Production');
    });

    it('[1.2] returns two title-cased words from lower-case words input', function() {
      expect(filter('hello sir')).toEqual('Hello Sir');
    });

  });

  describe('[2] with invalid inputs -->', function() {
    
    it('[2.1] returns a false when passed false', function() {
      expect(filter(false)).toBe(false);
    });

    it('[2.2] returns null when passed null', function() {
      expect(filter(null)).toBe(null);
    });

    it('[2.3] returns undefined when passed no value or object', function() {
      expect(filter()).not.toBeDefined();
    });

    it('[2.4] returns same number when passed an number', function() {
      expect(filter(1)).toBe(1);
    });

  });

});
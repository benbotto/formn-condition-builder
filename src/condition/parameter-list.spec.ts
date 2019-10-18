import { ParameterList } from '../';

describe('ParameterList()', function() {
  describe('.constructor()', function() {
    it('initially contains no parameters.', function() {
      const paramList = new ParameterList();

      expect(Object.keys(paramList.getParams()).length).toBe(0);
    });

    it('can copy parameters from another list.', function() {
      const paramList1 = new ParameterList();
      paramList1.addParameter(paramList1.createParameterName('name'), 'Jack');
      paramList1.addParameter(paramList1.createParameterName('age'), 30);

      const paramList2 = new ParameterList(paramList1);
      paramList2.addParameter(paramList2.createParameterName('occupation'), 'developer');

      expect(paramList2.getParams()).toEqual({
        name_0:       'Jack',
        age_1:        30,
        occupation_2: 'developer'
      });
    });
  });

  describe('.getParam()', () => {
    it('throws an error if the parameter does not exist.', () => {
      const paramList = new ParameterList();

      expect(() => paramList.getParam('foo'))
        .toThrowError('Parameter "foo" not found.');
    });

    it('returns the parameter.', () => {
      const paramList = new ParameterList();

      paramList.addParameter('foo', 'bar');

      expect(paramList.getParam('foo')).toBe('bar');
    });
  });

  describe('.getParams()', () => {
    it('returns all the parameters as a key-value pair.', () => {
      const paramList = new ParameterList();

      paramList.addParameter('foo', 'bar');
      paramList.addParameter('baz', 'boo');

      expect(paramList.getParams()).toEqual({foo: 'bar', baz: 'boo'});
    });
  });

  describe('.getParamNames()', () => {
    it('returns all the parameter names as an array.', () => {
      const paramList = new ParameterList();

      paramList.addParameter('foo', 'bar');
      paramList.addParameter('baz', 'boo');

      expect(paramList.getParamNames()).toEqual(['foo', 'baz']);
    });
  });

  describe('.createParameterName()', function() {
    let paramList: ParameterList;

    beforeEach(() => paramList = new ParameterList());

    it('replaces non-word characters with underscores.', function() {
      expect(paramList.createParameterName('here"is a.name')).toBe('here_is_a_name_0');
    });

    it('adds an ID at the end of each parameter.', function() {
      expect(paramList.createParameterName('name')).toBe('name_0');
      expect(paramList.createParameterName('name')).toBe('name_1');
      expect(paramList.createParameterName('name')).toBe('name_2');
    });
  });

  describe('.addParameter()', function() {
    let paramList: ParameterList;

    beforeEach(() => paramList = new ParameterList());

    it('stores the parameter.', function() {
      paramList.addParameter('name', 'Jack');
      expect(paramList.getParams().name).toBe('Jack');
    });

    it('raises an exception if the param already exists and the value is different.', function() {
      expect(function() {
        paramList.addParameter('name', 'Jack');
        paramList.addParameter('name', 'Jill');
      }).toThrowError('Parameter "name" already exists with value "Jack".');
    });

    it('does not raise an exception if the same key-value pair is set twice.', function() {
      expect(function() {
        paramList.addParameter('name', 'Jack');
        paramList.addParameter('name', 'Jack');
      }).not.toThrow();
    });

    it('allows parameters to be blindly overwritten.', function() {
      expect(function() {
        paramList.addParameter('name', 'Jack');
        paramList.addParameter('name', 'Jill', true);
      }).not.toThrow();
    });

    it('raises an exception of the parameter has invalid characters.', function() {
      paramList.addParameter('test-1',   'asdf');
      paramList.addParameter('test_2',   'asdf');
      paramList.addParameter('test_2-3', 'asdf');

      expect(function() {
        paramList.addParameter('0test', 'asdf');
      }).toThrowError('Parameter keys must match "/^[A-Za-z][\\w\\-]*$/".');
    });
  });

  describe('.addParameters()', function() {
    let paramList: ParameterList;

    beforeEach(() => paramList = new ParameterList());

    it('can copy key-value pairs from an object.', function() {
      const params = {name: 'Jack', age: 50};
      paramList.addParameters(params);
    });
  });
});

'use strict';


describe('Service: StorageService', function () {

  beforeEach(module('webClientApp'));
  var StorageSrv, mock;

  beforeEach(function () {
    // Mock localStorage.
    mock = {
      localStorage: {
        getItem: jasmine.createSpy(),
        setItem: jasmine.createSpy(),
        removeItem: jasmine.createSpy()
      }
    };
    module(function($provide) {
      $provide.value('$window', mock);
    });

    inject(function (StorageService) {
      StorageSrv = StorageService;
    });

  });

  it('store, retrieve and remove items', function () {
    StorageSrv.set('key1', 'value1');
    expect(mock.localStorage.setItem).toHaveBeenCalledWith('key1', 'value1');

    StorageSrv.get('key1');
    expect(mock.localStorage.getItem).toHaveBeenCalledWith('key1');

    StorageSrv.unset('key1');
    expect(mock.localStorage.removeItem).toHaveBeenCalledWith('key1');
  });

});

'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;


  var jobPriorityEntry1 = entryFactory.selectBox1(translate, {
    id: 'jobPriority1',
    label: translate('Thêm mới '),
    modelProperty: 'jobPriority1',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority1: bo.get('camunda:jobPriority1')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority1': values.jobPriority1 || undefined
      });
    }

  });


  return [ jobPriorityEntry1 ];

};

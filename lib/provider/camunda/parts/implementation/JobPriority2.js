'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry2 = entryFactory.textField(translate, {
    id: 'jobPriority2',
    label: translate('Tên '),
    modelProperty: 'jobPriority2',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority2: bo.get('camunda:jobPriority2')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority2': values.jobPriority2 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry2 ];
};

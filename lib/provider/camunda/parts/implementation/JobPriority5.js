'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry5 = entryFactory.textField5(translate, {
    id: 'jobPriority5',
    label: translate('Khách hàng'),
    modelProperty: 'jobPriority5',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority5: bo.get('camunda:jobPriority5')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority5': values.jobPriority5 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry5 ];
};

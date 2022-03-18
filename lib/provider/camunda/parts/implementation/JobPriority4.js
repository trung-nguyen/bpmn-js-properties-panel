'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry4 = entryFactory.textField4(translate, {
    id: 'jobPriority4',
    label: translate('Hạn bảo trì'),
    modelProperty: 'jobPriority4',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority4: bo.get('camunda:jobPriority4')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority4': values.jobPriority4 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry4 ];
};

'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry7 = entryFactory.textField7(translate, {
    id: 'jobPriority7',
    label: translate('Nơi nhận'),
    modelProperty: 'jobPriority7',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority7: bo.get('camunda:jobPriority7')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority7': values.jobPriority7 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry7 ];
};

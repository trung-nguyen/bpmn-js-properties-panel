'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry8 = entryFactory.checkbox8(translate, {
    id: 'jobPriority8',
    label: translate('Tự động'),
    modelProperty: 'jobPriority8',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority8: bo.get('camunda:jobPriority8')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority8': values.jobPriority8 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry8 ];
};

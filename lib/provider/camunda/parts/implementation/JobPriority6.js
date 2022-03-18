'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry6 = entryFactory.checkbox(translate, {
    id: 'jobPriority6',
    label: translate('Lặp lại'),
    modelProperty: 'jobPriority6',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority6: bo.get('camunda:jobPriority6')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority6': values.jobPriority6 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry6 ];
};

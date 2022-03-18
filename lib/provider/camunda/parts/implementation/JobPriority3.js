'use strict';

var entryFactory = require('../../../../factory/EntryFactory');

var cmdHelper = require('../../../../helper/CmdHelper');

module.exports = function(element, bpmnFactory, options, translate) {

  var getBusinessObject = options.getBusinessObject;

  var jobPriorityEntry3 = entryFactory.textField3(translate, {
    id: 'jobPriority3',
    label: translate('Hạn bảo hành'),
    modelProperty: 'jobPriority3',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      return {
        jobPriority3: bo.get('camunda:jobPriority3')
      };
    },

    set: function(element, values) {
      var bo = getBusinessObject(element);
      return cmdHelper.updateBusinessObject(element, bo, {
        'camunda:jobPriority3': values.jobPriority3 || undefined
      });
    }

  });

  


  return [ jobPriorityEntry3 ];
};

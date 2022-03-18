'use strict';

var is = require('bpmn-js/lib/util/ModelUtil').is,
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

var jobPriority = require('./implementation/JobPriority'),
    jobPriority1 = require('./implementation/JobPriority1'),
    jobPriority2 = require('./implementation/JobPriority2'),
    jobPriority3 = require('./implementation/JobPriority3'),
    jobPriority4 = require('./implementation/JobPriority4'),
    jobPriority5 = require('./implementation/JobPriority5'),
    jobPriority6 = require('./implementation/JobPriority6'),
    jobPriority7 = require('./implementation/JobPriority7'),
    jobPriority8 = require('./implementation/JobPriority8'),
    jobRetryTimeCycle = require('./implementation/JobRetryTimeCycle');

module.exports = function(group, element, bpmnFactory, translate) {
  var businessObject = getBusinessObject(element);


  ///// jobPriority "Hanh dong"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {
        console.log(element);
    group.entries = group.entries.concat(jobPriority(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority1 "Them moi"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {
      console.log(element)
    group.entries = group.entries.concat(jobPriority1(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority2 "Ten"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority2(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority3 "Han bao hanh"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority3(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority4 "Han bao trì"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority4(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority5 "Khách hàng"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority5(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

  ///// jobPriority6 "Lặp lại - checkbox"
  if (is(element, 'camunda:JobPriorized') ||
      is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority6(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }

   ///// jobPriority7 "Lặp lại - checkbox"
   if (is(element, 'camunda:JobPriorized') ||
   is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority7(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

          return bo.get('processRef');
        }
      }, translate));
    }

    ///// jobPriority8 "Lặp lại - checkbox"
    if (is(element, 'camunda:JobPriorized') ||
    is(element, 'bpmn:Participant') && businessObject.get('processRef')) {

    group.entries = group.entries.concat(jobPriority8(element, bpmnFactory, {
      getBusinessObject: function(element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

          return bo.get('processRef');
        }
      }, translate));
    }


  if (is(element, 'camunda:AsyncCapable')) {
    group.entries = group.entries.concat(jobRetryTimeCycle(element, bpmnFactory, {
      getBusinessObject: getBusinessObject
    }, translate));
  }

};

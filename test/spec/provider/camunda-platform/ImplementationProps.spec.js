import TestContainer from 'mocha-test-container-support';
import { act } from '@testing-library/preact';

import {
  bootstrapPropertiesPanel,
  changeInput,
  inject
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import CoreModule from 'bpmn-js/lib/core';
import SelectionModule from 'diagram-js/lib/features/selection';
import ModelingModule from 'bpmn-js/lib/features/modeling';

import BpmnPropertiesPanel from 'src/render';

import {
  getServiceTaskLikeBusinessObject
} from 'src/provider/camunda-platform/utils/ImplementationTypeUtils';

import {
  getExtensionElementsList
} from 'src/provider/camunda-platform/utils/ExtensionElementsUtil';

import BpmnPropertiesProvider from 'src/provider/bpmn';
import CamundaPlatformPropertiesProvider from 'src/provider/camunda-platform';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda.json';

import diagramXML from './ImplementationProps.bpmn';


describe('provider/camunda-platform - ImplementationProps', function() {

  const testModules = [
    BpmnPropertiesPanel,
    BpmnPropertiesProvider,
    CamundaPlatformPropertiesProvider,
    CoreModule,
    ModelingModule,
    SelectionModule
  ];

  let container;

  const moddleExtensions = {
    camunda: camundaModdleExtensions
  };


  describe('camunda:ServiceTaskLike#class', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_expression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=javaClass]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=javaClass]', container);

      // then
      expect(input.value).to.eql(
        getBusinessObject(serviceTask).get('camunda:class')
      );
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=javaClass]', container);
      changeInput(input, 'newValue');

      // then
      expect(getBusinessObject(serviceTask).get('camunda:class')).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_class');

        const originalValue = getBusinessObject(serviceTask).get('camunda:class');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=javaClass]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });


  describe('camunda:ServiceTaskLike#expression', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expression]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_expression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expression]', container);

      // then
      expect(input.value).to.eql(
        getBusinessObject(serviceTask).get('camunda:expression')
      );
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_expression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expression]', container);
      changeInput(input, 'newValue');

      // then
      expect(getBusinessObject(serviceTask).get('camunda:expression')).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_expression');

        const originalValue = getBusinessObject(serviceTask).get('camunda:expression');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=expression]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });


  describe('camunda:ServiceTaskLike#resultVariable', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expressionResultVariable]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_expression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expressionResultVariable]', container);

      // then
      expect(input.value).to.eql(
        getBusinessObject(serviceTask).get('camunda:resultVariable')
      );
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_expression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=expressionResultVariable]', container);
      changeInput(input, 'newValue');

      // then
      expect(getBusinessObject(serviceTask).get('camunda:resultVariable')).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_expression');

        const originalValue = getBusinessObject(serviceTask).get('camunda:resultVariable');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=expressionResultVariable]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });


  describe('camunda:ServiceTaskLike#delegateExpression', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=delegateExpression]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_delegateExpression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=delegateExpression]', container);

      // then
      expect(input.value).to.eql(
        getBusinessObject(serviceTask).get('camunda:delegateExpression')
      );
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_delegateExpression');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=delegateExpression]', container);
      changeInput(input, 'newValue');

      // then
      expect(
        getBusinessObject(serviceTask).get('camunda:delegateExpression')
      ).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_delegateExpression');

        const originalValue = getBusinessObject(serviceTask).get('camunda:delegateExpression');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=delegateExpression]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });


  describe('camunda:ServiceTaskLike#topic', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=externalTopic]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_external');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=externalTopic]', container);

      // then
      expect(input.value).to.eql(
        getBusinessObject(serviceTask).get('camunda:topic')
      );
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_external');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=externalTopic]', container);
      changeInput(input, 'newValue');

      // then
      expect(getBusinessObject(serviceTask).get('camunda:topic')).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_external');

        const originalValue = getBusinessObject(serviceTask).get('camunda:topic');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=externalTopic]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });


  describe('camunda:ServiceTaskLike#connectorId', function() {

    beforeEach(function() {
      container = TestContainer.get(this);
    });

    beforeEach(bootstrapPropertiesPanel(diagramXML, {
      modules: testModules,
      moddleExtensions,
      debounceInput: false
    }));


    it('should NOT display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_class');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=connectorId]', container);

      // then
      expect(input).to.not.exist;
    }));


    it('should display', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_connector');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=connectorId]', container);

      // then
      expect(input.value).to.eql(getConnector(serviceTask).get('camunda:connectorId'));
    }));


    it('should update', inject(async function(elementRegistry, selection) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_connector');

      await act(() => {
        selection.select(serviceTask);
      });

      // when
      const input = domQuery('input[name=connectorId]', container);
      changeInput(input, 'newValue');

      // then
      expect(getConnector(serviceTask).get('camunda:connectorId')).to.eql('newValue');
    }));


    it('should update on external change',
      inject(async function(elementRegistry, selection, commandStack) {

        // given
        const serviceTask = elementRegistry.get('ServiceTask_connector');

        const originalValue = getConnector(serviceTask).get('camunda:connectorId');

        await act(() => {
          selection.select(serviceTask);
        });
        const input = domQuery('input[name=connectorId]', container);
        changeInput(input, 'newValue');

        // when
        await act(() => {
          commandStack.undo();
        });

        // then
        expect(input.value).to.eql(originalValue);
      })
    );

  });

});


// helper /////////////////////

function getConnectors(businessObject) {
  return getExtensionElementsList(businessObject, 'camunda:Connector');
}

function getConnector(element) {
  const businessObject = getServiceTaskLikeBusinessObject(element);
  const connectors = getConnectors(businessObject);

  return connectors[0];
}
import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { TextFieldEntry } from '@bpmn-io/properties-panel';

import { useCallback } from '@bpmn-io/properties-panel/preact/hooks';

import {
  getPath,
  pathStringify
} from '@philippfromme/moddle-helpers';

import {
  useService
} from '../../../hooks';


export default function InputOutputParameter(props) {

  const {
    idPrefix,
    parameter
  } = props;

  const entries = [ {
    id: idPrefix + '-target',
    component: TargetProperty,
    parameter
  },{
    id: idPrefix + '-source',
    component: SourceProperty,
    parameter
  } ];

  return entries;
}

function TargetProperty(props) {
  const {
    element,
    id,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        target: value
      }
    });
  };

  const getValue = (parameter) => {
    return parameter.target;
  };

  const businessObject = getBusinessObject(element);

  const show = useCallback((event) => {
    return event.id === businessObject.get('id')
      && event.path
      && pathStringify(event.path) === pathStringify([ ...getPath(parameter, businessObject), 'target' ]);
  }, [ businessObject, parameter ]);

  return TextFieldEntry({
    element: parameter,
    id,
    label: translate((is(parameter, 'zeebe:Input') ? 'Local variable name' : 'Process variable name')),
    getValue,
    setValue,
    debounce,
    show
  });
}

function SourceProperty(props) {
  const {
    element,
    id,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        source: value
      }
    });
  };

  const getValue = (parameter) => {
    return parameter.source;
  };

  const businessObject = getBusinessObject(element);

  const show = useCallback((event) => {
    return event.id === businessObject.get('id')
      && event.path
      && pathStringify(event.path) === pathStringify([ ...getPath(parameter, businessObject), 'source' ]);
  }, [ businessObject, parameter ]);

  return TextFieldEntry({
    element: parameter,
    id,
    label: translate('Variable assignment value'),
    getValue,
    setValue,
    debounce,
    show
  });
}
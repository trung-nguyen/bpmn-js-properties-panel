import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { TextFieldEntry } from '@bpmn-io/properties-panel';

import {
  useService
} from '../../../hooks';

import {
  getPath,
  pathStringify
} from '../../../utils/IdsUtil';


export default function InputOutputParameter(props) {

  const {
    idPrefix,
    element,
    parameter
  } = props;

  const entries = [ {
    id: `${ idPrefix }-target`,
    component: (props) => <TargetProperty { ...props } idPrefix={ idPrefix } element={ element } parameter={ parameter } />
  },{
    id: `${ idPrefix }-source`,
    component: (props) => <SourceProperty { ...props } idPrefix={ idPrefix } element={ element } parameter={ parameter } />
  } ];

  return entries;
}

function TargetProperty(props) {
  const {
    element,
    id,
    onOpen,
    parameter
  } = props;

  const businessObject = getBusinessObject(element);

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

  const path = getPath(parameter, businessObject);

  return TextFieldEntry({
    element: parameter,
    id: pathStringify([ ...path, 'target' ]),
    type: is(parameter, 'zeebe:Input') ? 'input-target' : 'output-target',
    label: translate((is(parameter, 'zeebe:Input') ? 'Local variable name' : 'Process variable name')),
    getValue,
    setValue,
    debounce,
    onOpen
  });
}

function SourceProperty(props) {
  const {
    element,
    id,
    onOpen,
    parameter
  } = props;

  const businessObject = getBusinessObject(element);

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

  const path = getPath(parameter, businessObject);

  return TextFieldEntry({
    element: parameter,
    id: pathStringify([ ...path, 'source' ]),
    type: is(parameter, 'zeebe:Input') ? 'input-source' : 'output-source',
    label: translate('Variable assignment value'),
    getValue,
    setValue,
    debounce,
    onOpen
  });
}
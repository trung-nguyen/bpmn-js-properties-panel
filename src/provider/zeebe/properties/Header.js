import { TextFieldEntry } from '@bpmn-io/properties-panel';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import {
  useService
} from '../../../hooks';

import { getPath, pathStringify } from '../../../utils/IdsUtil';

export default function Header(props) {

  const {
    element,
    header,
    idPrefix
  } = props;

  const entries = [ {
    id: `${ idPrefix }-key`,
    type: 'header-key',
    component: <KeyProperty element={ element } header={ header } />
  },{
    id: `${ idPrefix }-value`,
    type: 'header-value',
    component: <ValueProperty element={ element } header={ header } />
  } ];

  return entries;
}

function KeyProperty(props) {
  const {
    element,
    header
  } = props;

  const businessObject = getBusinessObject(element);

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: header,
      properties: {
        key: value
      }
    });
  };

  const getValue = (header) => {
    return header.key;
  };

  const path = header && getPath(header, businessObject);

  return <TextFieldEntry
    element={ header }
    id={ pathStringify([ ...path, 'key' ]) }
    type="header-key"
    label={ translate('Key') }
    getValue={ getValue }
    setValue={ setValue }
    debounce={ debounce }
  />;
}

function ValueProperty(props) {
  const {
    element,
    header
  } = props;

  const businessObject = getBusinessObject(element);

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: header,
      properties: {
        value
      }
    });
  };

  const getValue = (header) => {
    return header.value;
  };

  const path = header && getPath(header, businessObject);

  return <TextFieldEntry
    element={ header }
    id={ pathStringify([ ...path, 'value' ]) }
    type="header-value"
    label={ translate('Value') }
    getValue={ getValue }
    setValue={ setValue }
    debounce={ debounce }
  />;
}
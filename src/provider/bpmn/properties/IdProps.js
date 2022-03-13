import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';

import { useCallback } from '@bpmn-io/properties-panel/preact/hooks';

import { pathEquals } from '@philippfromme/moddle-helpers';

import {
  useService
} from '../../../hooks';

import {
  isIdValid
} from '../utils/ValidationUtil';


/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
export function IdProps() {
  return [
    {
      id: 'id',
      component: Id,
      isEdited: isTextFieldEntryEdited
    }
  ];
}

function Id(props) {
  const {
    element,
    id
  } = props;

  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  const setValue = (value) => {
    modeling.updateProperties(element, {
      id: value
    });
  };

  const getValue = (element) => {
    return element.businessObject.id;
  };

  const validate = (value) => {
    const businessObject = getBusinessObject(element);

    return isIdValid(businessObject, value, translate);
  };

  const businessObject = getBusinessObject(element);

  const show = useCallback((event) => {
    return event.id === businessObject.get('id') && event.path && pathEquals(event.path, [ 'id' ]);
  }, [ businessObject ]);

  return TextFieldEntry({
    element,
    id,
    label: translate(is(element, 'bpmn:Participant') ? 'Participant ID' : 'ID'),
    getValue,
    setValue,
    debounce,
    validate,
    show
  });
}
import {
  ArrowIcon,
  CreateIcon,
  DropdownButton,
  HeaderButton,
  useLayoutState
} from '@bpmn-io/properties-panel';

import classnames from 'classnames';

import { isUndefined } from 'min-dash';

import {
  useService
} from '../../../hooks';

import { getTemplateId as defaultGetTemplateId } from '../Helper';

import {
  getVersionOrDateFromTemplate,
  removeTemplate,
  unlinkTemplate as defaultUnlinkTemplate,
  updateTemplate as defaultUpdateTemplate
} from '../util/templateUtil';


/**
 * @typedef {NoTemplate|KnownTemplate|UnknownTemplate|OutdatedTemplate} TemplateState
 */

/**
 * @typedef NoTemplate
 * @property {'NO_TEMPLATE'} type
 *
 * @typedef KnownTemplate
 * @property {'KNOWN_TEMPLATE'} type
 * @property {object} template
 *
 * @typedef UnknownTemplate
 * @property {'UNKNOWN_TEMPLATE'} type
 * @property {string} templateId
 *
 * @typedef OutdatedTemplate
 * @property {'OUTDATED_TEMPLATE'} type
 * @property {object} template
 * @property {object} newerTemplate
 */

/**
 * Factory to create an element templates group.
 *
 * @param {object} [props]
 * @param {function} [props.getTemplateId]
 * @param {function} [props.unlinkTemplate]
 * @param {function} [props.updateTemplate]
 */
export function createElementTemplatesGroup(props = {}) {

  const {
    getTemplateId = defaultGetTemplateId,
    unlinkTemplate = defaultUnlinkTemplate,
    updateTemplate = defaultUpdateTemplate
  } = props;

  return function ElementTemplatesGroup(props) {
    const {
      id,
      label,
      element,
      entries = []
    } = props;

    const [ open, setOpen ] = useLayoutState(
      [ 'groups', id, 'open' ],
      false
    );

    const empty = !entries.length;

    const toggleOpen = () => !empty && setOpen(!open);

    return <div class="bio-properties-panel-group bio-properties-panel-templates-group" data-group-id={ 'group-' + id }>
      <div class={ classnames(
        'bio-properties-panel-group-header',
        {
          empty,
          open: open && !empty
        }
      ) } onClick={ toggleOpen }
      >
        <div title={ label } class="bio-properties-panel-group-header-title">
          { label }
        </div>

        <div class="bio-properties-panel-group-header-buttons">
          <TemplateGroupButtons
            element={ element }
            getTemplateId={ getTemplateId }
            unlinkTemplate={ unlinkTemplate }
            updateTemplate={ updateTemplate } />
          { !empty && <SectionToggle open={ open } /> }
        </div>
      </div>

      <div class={ classnames(
        'bio-properties-panel-group-entries',
        { open: open && !empty }
      ) }>
        {
          entries.map(entry => {
            const {
              component: Component,
              id
            } = entry;

            return (
              <Component
                { ...entry }
                key={ id }
                element={ element } />
            );
          })
        }
      </div>
    </div>;
  };

}

function SectionToggle({ open }) {
  return <HeaderButton
    title="Toggle section"
    class="bio-properties-panel-arrow"
  >
    <ArrowIcon class={ open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right' } />
  </HeaderButton>;
}


/**
 *
 * @param {object} props
 * @param {object} props.element
 * @param {function} props.getTemplateId
 * @param {function} props.unlinkTemplate
 * @param {function} props.updateTemplate
 */
function TemplateGroupButtons({ element, getTemplateId, unlinkTemplate, updateTemplate }) {
  const elementTemplates = useService('elementTemplates');

  const templateState = getTemplateState(elementTemplates, element, getTemplateId);

  if (templateState.type === 'NO_TEMPLATE') {
    return <SelectEntryTemplate element={ element } />;
  } else if (templateState.type === 'KNOWN_TEMPLATE') {
    return <AppliedTemplate element={ element } unlinkTemplate={ unlinkTemplate } />;
  } else if (templateState.type === 'UNKNOWN_TEMPLATE') {
    return <UnknownTemplate element={ element } unlinkTemplate={ unlinkTemplate } />;
  } else if (templateState.type === 'OUTDATED_TEMPLATE') {
    return <OutdatedTemplate
      element={ element }
      templateState={ templateState }
      unlinkTemplate={ unlinkTemplate }
      updateTemplate={ updateTemplate } />;
  }
}

function SelectEntryTemplate({ element }) {
  const translate = useService('translate');
  const eventBus = useService('eventBus');

  const selectTemplate = () => eventBus.fire('elementTemplates.select', { element });

  return (
    <HeaderButton
      title="Select a template"
      class="bio-properties-panel-select-template-button"
      onClick={ selectTemplate }
    >
      <CreateIcon />
      <span>{ translate('Select') }</span>
    </HeaderButton>
  );
}

function AppliedTemplate({ element, unlinkTemplate }) {
  const translate = useService('translate'),
        injector = useService('injector');

  const menuItems = [
    { entry: translate('Unlink'), action: () => unlinkTemplate(element, injector) },
    { entry: <RemoveTemplate />, action: () => removeTemplate(element, injector) }
  ];

  return (
    <DropdownButton menuItems={ menuItems } class="bio-properties-panel-applied-template-button">
      <HeaderButton>
        <span>{ translate('Applied') }</span>
        <ArrowIcon class="bio-properties-panel-arrow-down" />
      </HeaderButton>
    </DropdownButton>
  );
}

function RemoveTemplate() {
  const translate = useService('translate');

  return <span class="bio-properties-panel-remove-template">{ translate('Remove') }</span>;
}

function UnknownTemplate({ element, unlinkTemplate }) {
  const translate = useService('translate'),
        injector = useService('injector');

  const menuItems = [
    { entry: <NotFoundText /> },
    { separator: true },
    { entry: translate('Unlink'), action: () => unlinkTemplate(element, injector) },
    { entry: <RemoveTemplate />, action: () => removeTemplate(element, injector) }
  ];

  return (
    <DropdownButton menuItems={ menuItems } class="bio-properties-panel-template-not-found">
      <HeaderButton>
        <span>{ translate('Not found') }</span>
        <ArrowIcon class="bio-properties-panel-arrow-down" />
      </HeaderButton>
    </DropdownButton>
  );
}

function NotFoundText() {
  const translate = useService('translate');

  return (
    <div class="bio-properties-panel-template-not-found-text">
      { translate(
        'The template applied was not found. Therefore, its properties cannot be shown. Unlink to access the data.'
      ) }
    </div>
  );
}

/**
 *
 * @param {object} props
 * @param {object} element
 * @param {UnknownTemplate} templateState
 * @param {function} unlinkTemplate
 * @param {function} updateTemplate
 */
function OutdatedTemplate({ element, templateState, unlinkTemplate, updateTemplate }) {
  const { newerTemplate } = templateState;

  const translate = useService('translate'),
        injector = useService('injector');

  const menuItems = [
    { entry: <UpdateAvailableText newerTemplate={ newerTemplate } /> },
    { separator: true },
    { entry: translate('Update'), action: () => updateTemplate(element, newerTemplate, injector) },
    { entry: translate('Unlink'), action: () => unlinkTemplate(element, injector) },
    { entry: <RemoveTemplate />, action: () => removeTemplate(element, injector) }
  ];

  return (
    <DropdownButton menuItems={ menuItems } class="bio-properties-panel-template-update-available">
      <HeaderButton>
        <span>{ translate('Update available') }</span>
        <ArrowIcon class="bio-properties-panel-arrow-down" />
      </HeaderButton>
    </DropdownButton>
  );
}

function UpdateAvailableText({ newerTemplate }) {
  const translate = useService('translate');

  const text = translate(
    'A new version of the template is available: {templateVersion}',
    { templateVersion: getVersionOrDateFromTemplate(newerTemplate) }
  );

  return <div class="bio-properties-panel-template-update-available-text">{text}</div>;
}


// helper //////

/**
 * Determine template state in the current element.
 *
 * @param {object} elementTemplates
 * @param {object} element
 * @param {function} getTemplateId
 * @returns {TemplateState}
 */
function getTemplateState(elementTemplates, element, getTemplateId) {
  const templateId = getTemplateId(element),
        template = elementTemplates.get(element);

  if (!templateId) {
    return { type: 'NO_TEMPLATE' };
  }

  if (!template) {
    return { type: 'UNKNOWN_TEMPLATE', templateId };
  }

  const newerTemplate = findNewestElementTemplate(elementTemplates, template);
  if (newerTemplate) {
    return { type: 'OUTDATED_TEMPLATE', template, newerTemplate };
  }

  return { type: 'KNOWN_TEMPLATE', template };
}

function findNewestElementTemplate(elementTemplates, currentElementTemplate) {
  if (isUndefined(currentElementTemplate.version)) {
    return null;
  }

  return elementTemplates
    .getAll()
    .filter(function(elementTemplate) {
      return currentElementTemplate.id === elementTemplate.id && !isUndefined(elementTemplate.version);
    })
    .reduce(function(newestElementTemplate, elementTemplate) {
      if (currentElementTemplate.version < elementTemplate.version) {
        return elementTemplate;
      }

      if (newestElementTemplate && newestElementTemplate.version < elementTemplate.version) {
        return elementTemplate;
      }

      return newestElementTemplate;
    }, null);
}

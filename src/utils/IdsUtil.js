/**
 * Get path from model element and optional root model element.
 *
 * @param {ModdleElement} moddleElement
 * @param {ModdleElement} [rootModdleElement]
 *
 * @returns {string[]}
 */
export function getPath(moddleElement, rootModdleElement) {
  let path = [];

  let parentModdleElement = moddleElement.$parent;

  while (parentModdleElement) {
    path = [ ...getPropertyName(moddleElement, parentModdleElement), ...path ];

    moddleElement = parentModdleElement;

    if (rootModdleElement && moddleElement === rootModdleElement) {
      return path;
    }

    parentModdleElement = parentModdleElement.$parent;
  }

  return path;
}

/**
 * Get property name from model element and parent model element.
 *
 * @param {ModdleElement} moddleElement
 * @param {ModdleElement} parentModdleElement
 *
 * @returns {string[]}
 */
function getPropertyName(moddleElement, parentModdleElement) {
  for (let property of Object.values(parentModdleElement.$descriptor.propertiesByName)) {
    if (property.isMany) {
      if (parentModdleElement.get(property.name).includes(moddleElement)) {
        return [
          property.name,
          parentModdleElement.get(property.name).indexOf(moddleElement)
        ];
      }
    } else {
      if (parentModdleElement.get(property.name) === moddleElement) {
        return [ property.name ];
      }
    }
  }

  return [];
}

/**
 * @param {string} path
 * @param {string} [separator]
 *
 * @returns {(number|string)[]}
 */
export function pathParse(path = '', separator = '.') {
  return path.split(separator);
}

/**
 * @param {(number|string)[]} path
 * @param {string} [separator]
 *
 * @returns {string}
 */
export function pathStringify(path = [], separator = '.') {
  return path.join(separator);
}
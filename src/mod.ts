export interface RenderFn {
  <T extends Element>(element: T): T;
}

export function appendTo(parent: Element): RenderFn {
  return parent.appendChild.bind(parent);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Partial<HTMLElementTagNameMap[K]>,
  ...children: Element[]
) {
  const element = document.createElement(tagName);

  if (attributes) setAttributes(element, attributes);
  if (children.length) setChildren(element, children);

  return element;
}

function setAttributes<T extends Element>(element: T, attributes: Partial<T>) {
  for (const key in attributes) {
    if (attributes[key] !== null) {
      element.setAttribute(key, "" + attributes[key]);
    } else {
      element.removeAttribute(key);
    }
  }
}

function setChildren(element: Element, children: (Element | string)[]) {
  while (element.firstChild) element.removeChild(element.firstChild);
  children.forEach(child => {
    element.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  });
}

// JSX compatibility
export const React = { createElement };

declare global {
  namespace JSX {
    type IntrinsicElements = Subpartial<HTMLElementTagNameMap>;
  }
}

type Subpartial<T> = {
  [K in keyof T]: Partial<T[K]>;
};

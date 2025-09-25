class Component {
  constructor({ name, props = {}, children = [], textContent }) {
    this.name = name;
    this.props = props;
    this.children = children;
  }

  toString(indent = 1, depth = 0) {
    const props = Object.entries(this.props).map(([key, value]) => {
      if (value === undefined) {
        return key;
      }
      return `${key}="${value}"`;
    });

    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';

    const indents = Array(indent * depth)
      .fill('\t')
      .join('');

    const childrenString = this.childrenToString(indent, depth);

    return `${indents}<${this.name}${propsString}>\n${childrenString}\n${indents}</${this.name}>`;
  }

  childrenToString(indent, depth) {
    const childStrings = [];

    const nextDepth = depth + 1;

    const stringChildIndents = Array(indent * nextDepth)
      .fill('\t')
      .join('');

    for (const child of this.children) {
      if (child.constructor.name === 'String') {
        const lines = child.split('\n');

        const indentedString = lines.map((line) => `${stringChildIndents}${line}`).join('\n');

        childStrings.push(indentedString);
        continue;
      }

      const childString = child.toString(indent, nextDepth);
      childStrings.push(childString);
    }

    const string = childStrings.join('\n');

    return string;
  }
}

module.exports = { Component };

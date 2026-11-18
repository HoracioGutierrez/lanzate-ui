// Enforces one React component per file.
// See docs/architecture/conventions.md#one-component-per-file

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/
const COMPONENT_WRAPPERS = new Set(["memo", "forwardRef", "lazy"])

function isWrapperCall(node) {
  if (node?.type !== "CallExpression") return false
  const { callee } = node
  if (callee.type === "Identifier") return COMPONENT_WRAPPERS.has(callee.name)
  return callee.type === "MemberExpression" && COMPONENT_WRAPPERS.has(callee.property.name)
}

function componentName(node) {
  if (node.type === "FunctionDeclaration" && node.id && PASCAL_CASE.test(node.id.name)) {
    return node.id.name
  }
  if (node.type === "ClassDeclaration" && node.id && PASCAL_CASE.test(node.id.name) && node.superClass) {
    return node.id.name
  }
  return null
}

function declaratorComponentName(declarator) {
  if (declarator.id.type !== "Identifier" || !PASCAL_CASE.test(declarator.id.name)) return null
  const init = declarator.init
  if (!init) return null
  if (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression" || isWrapperCall(init)) {
    return declarator.id.name
  }
  return null
}

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: { description: "Allow a single React component per file." },
    messages: {
      extra:
        "'{{name}}' is a second component in this file (first: '{{first}}'). Move it to its own kebab-case file, e.g. '{{file}}.tsx'. See docs/architecture/conventions.md#one-component-per-file",
    },
    schema: [],
  },
  create(context) {
    const found = []

    function collect(node) {
      const target = node.type === "ExportNamedDeclaration" || node.type === "ExportDefaultDeclaration" ? node.declaration : node
      if (!target) return
      const direct = componentName(target)
      if (direct) found.push({ name: direct, node: target })
      if (target.type === "VariableDeclaration") {
        for (const declarator of target.declarations) {
          const name = declaratorComponentName(declarator)
          if (name) found.push({ name, node: declarator })
        }
      }
    }

    return {
      "Program > *": collect,
      "Program:exit"() {
        const [first, ...rest] = found
        for (const extra of rest) {
          context.report({
            node: extra.node,
            messageId: "extra",
            data: {
              name: extra.name,
              first: first.name,
              file: extra.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
            },
          })
        }
      },
    }
  },
}

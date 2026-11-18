// Types and interfaces live only in `*.types.ts` files, and those files hold only types.
// See docs/architecture/conventions.md#types-live-in-types-files

const TYPES_FILE = /\.types\.ts$/
const DECLARATION_FILE = /\.d\.ts$/

function isTypeOnlyStatement(node) {
  switch (node.type) {
    case "TSTypeAliasDeclaration":
    case "TSInterfaceDeclaration":
      return true
    case "ImportDeclaration":
      return node.importKind === "type" || (node.specifiers.length > 0 && node.specifiers.every((s) => s.importKind === "type"))
    case "ExportNamedDeclaration":
      if (node.declaration) return isTypeOnlyStatement(node.declaration)
      return node.exportKind === "type" || (node.specifiers.length > 0 && node.specifiers.every((s) => s.exportKind === "type"))
    case "ExportAllDeclaration":
      return node.exportKind === "type"
    default:
      return false
  }
}

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: { description: "Keep types in *.types.ts files and keep those files type-only." },
    messages: {
      declaration:
        "Declare '{{name}}' in a sibling '*.types.ts' file and import it with `import type`. See docs/architecture/conventions.md#types-live-in-types-files",
      inline:
        "Inline object type in a parameter. Name it (e.g. '{{fn}}Props') in a sibling '*.types.ts' file. See docs/architecture/conventions.md#types-live-in-types-files",
      enum: "Don't use enums; use a string union type in a '*.types.ts' file. See docs/architecture/conventions.md#types-live-in-types-files",
      runtime:
        "'*.types.ts' files hold only types: move this runtime code out, and use `import type` / `export type`. See docs/architecture/conventions.md#types-live-in-types-files",
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename.replaceAll("\\", "/")
    if (DECLARATION_FILE.test(filename)) return {}
    const isTypesFile = TYPES_FILE.test(filename)

    function functionName(fn) {
      if (fn.id?.name) return fn.id.name
      if (fn.parent?.type === "VariableDeclarator" && fn.parent.id.type === "Identifier") return fn.parent.id.name
      return "Function"
    }

    function checkParams(fn) {
      for (const param of fn.params) {
        const target = param.type === "AssignmentPattern" ? param.left : param
        if (target.typeAnnotation?.typeAnnotation?.type === "TSTypeLiteral") {
          context.report({ node: target.typeAnnotation, messageId: "inline", data: { fn: functionName(fn) } })
        }
      }
    }

    const visitors = {
      TSEnumDeclaration(node) {
        context.report({ node, messageId: "enum" })
      },
    }

    if (isTypesFile) {
      visitors["Program > *"] = (node) => {
        if (node.type === "TSEnumDeclaration") return
        if (!isTypeOnlyStatement(node)) context.report({ node, messageId: "runtime" })
      }
      return visitors
    }

    return {
      ...visitors,
      TSTypeAliasDeclaration(node) {
        context.report({ node, messageId: "declaration", data: { name: node.id.name } })
      },
      TSInterfaceDeclaration(node) {
        context.report({ node, messageId: "declaration", data: { name: node.id.name } })
      },
      FunctionDeclaration: checkParams,
      FunctionExpression: checkParams,
      ArrowFunctionExpression: checkParams,
    }
  },
}

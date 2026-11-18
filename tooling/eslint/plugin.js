// Local ESLint plugin with this project's architecture rules.
// Each rule's message links to the doc that explains it (docs/architecture/).

import noMagicDesignValues from "./rules/no-magic-design-values.js"
import oneComponentPerFile from "./rules/one-component-per-file.js"
import typesInTypesFiles from "./rules/types-in-types-files.js"

export default {
  meta: { name: "lanzate" },
  rules: {
    "no-magic-design-values": noMagicDesignValues,
    "one-component-per-file": oneComponentPerFile,
    "types-in-types-files": typesInTypesFiles,
  },
}

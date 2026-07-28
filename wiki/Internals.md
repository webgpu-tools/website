# Internals

Resources for those interested in the internal design of WESL.

## Grammars

- [lezer-wesl](https://github.com/webgpu-tools/wesl-js/tree/main/packages/lezer-wesl) —
  Lezer grammar for WESL/WGSL, used by CodeMirror editors (including [wgsl-edit](wgsl-edit)).
- [tree-sitter-wesl](https://github.com/webgpu-tools/tree-sitter-wesl) —
  Tree-sitter grammar for WESL/WGSL, used by Neovim, Emacs, Zed, and other editors.

## Forthcoming Tools

- [wgsl-analyzer](https://github.com/wgsl-analyzer/wgsl-analyzer) —
  Language server for WESL providing go-to-definition, hover docs, and diagnostics across the module graph.
  Multi-editor support (VS Code, Emacs, Neovim).
- [wesldoc](https://github.com/jannik4/wesldoc) —
  Documentation generator for web documentation from shader code.

## Reference

- [Glossary](/spec/GLOSSARY.html) — Key terms and definitions
- [Name Mangling](/spec/NameMangling.html) — How declarations are renamed in output WGSL
- [Versioning](/spec/Versioning.html) — Edition versioning strategy

## Design Documents

See [Design Docs](Design-Discussions) for design rationale documents
and historical design discussions.

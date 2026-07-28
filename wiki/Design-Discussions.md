# Design Docs

Rationale documents explaining why WESL features are designed the way they are.
These accompany the [specification](/spec/README.html) in the
[wesl-spec](https://github.com/webgpu-tools/wesl-spec) repository.

## Design Rationale

- [Designing WESL](/spec/Designing.html) —
  Goals, priorities, and audience considerations guiding WESL's design
- [Imports Design](/spec/ImportsDesign.html) —
  Wildcard import tradeoffs and the `@!` module attribute form
- [Visibility Design](/spec/VisibilityDesign.html) —
  Why three visibility levels, why *package* by default, why re-exports cannot widen
- [Conditional Translation Design](/spec/ConditionalTranslationDesign.html) —
  Design rationale for structured `@if` vs unstructured `#ifdef`

## Historical Discussions

- [Import syntax discussion](https://hackmd.io/ljkByEcnQa2NdNLWed2M6Q)
- [Community use of WGSL string interpolation](https://hackmd.io/mz1upr_YSu62nLftLoJBow)
- [Plugin design ideas](https://hackmd.io/gXCVcz_NRVm8uOJzvrKCjg)
- [Old generics discussion](https://docs.google.com/document/d/1ITV3MfQly0xszrKv_fURpcz-NdhONYl_-EHxyPL6w-I)
- [Packaging design](https://docs.google.com/document/d/15keY7Ktj4zoAiFlEGosxVnCqkR48zVnEPRcVe9NFDZY)
- [Use.GPU ideas with unconed](https://docs.google.com/document/d/1mSnoyqjDAL0bKAz4_UbBuoYA6sczBg2B4o_XEQJE7UY)
- [Meeting notes 2024.09](https://docs.google.com/document/d/1i8Rgj9DI2XxMO3OEHppGpDvOXV-FEwVfWVqIgZ_uzcU)

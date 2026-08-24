# Code Enforcement — Respond to Property Inspection Request

**Flagship Gold Standard Workflow**

Evidence-first, property-aware, jurisdiction-aware, multi-LLM procedural analysis and response system for code enforcement property inspection requests.

## Overview

This system helps a person facing a code enforcement inspection request to:

1. **Understand** what the notice says and what the agency is asking
2. **Verify** the complaint basis, property records, and jurisdiction
3. **Document** the timeline, evidence, and discrepancies
4. **Respond** with a factual, professional draft — all with multi-LLM verification

It is **not** a letter generator. It is an evidence-first procedural analysis system.

## Gold Standard Certification

All 33 Gold stages pass:

- ✅ Secure document ingestion (with prompt injection defenses)
- ✅ Document classification (with confidence scoring)
- ✅ Notice extraction (with source provenance)
- ✅ Complaint provenance (allegation ≠ verified condition)
- ✅ Recipient/ownership reconciliation (deceased recipient support)
- ✅ Property intelligence (address/APN/owner reconciliation)
- ✅ Jurisdiction identification (McKinleyville → Humboldt County, not assumed)
- ✅ Authoritative jurisdiction research (official sources only)
- ✅ Inspection scope analysis (explicit/partial/ambiguous/unknown)
- ✅ Consent/authority analysis (with Fourth Amendment awareness)
- ✅ Warrant language analysis
- ✅ Deterministic timeline (with fact classification)
- ✅ Evidence graph (full traceability)
- ✅ Discrepancy engine (15+ discrepancy types)
- ✅ Multi-LLM routing (Gemini default, OpenAI/Claude fallback)
- ✅ Independent model review (high-consequence tasks)
- ✅ Disagreement handling (blocks automatic finalization)
- ✅ Grounded strategy engine (12 strategy types)
- ✅ Draft engine (with fabrication check)
- ✅ Independent draft critique
- ✅ Final validation (different provider than drafting)
- ✅ Provenance (every consequential output traceable)
- ✅ Human review & authorization (no automatic send)
- ✅ Fulfillment adapter (MailMyPDF boundary)
- ✅ Tracking & proof generation
- ✅ SEO canonical route
- ✅ 71 tests passing
- ✅ Production build passing

## Architecture

### AI Provider Layer (Phase 1)

- **Gemini** is the default/primary provider
- **OpenAI** and **Claude** are fallback/independent-review providers
- Provider-neutral `AIProvider` abstraction
- Task-specific routing via `AI_TASK_CONFIG`
- Circuit breaker, timeout handling, output validation
- Model disagreement detection with `HUMAN_REVIEW_REQUIRED` blocking

### Task Routing

| Task | Primary | Fallback | Independent Review |
|------|---------|----------|-------------------|
| Document Classification | Gemini | OpenAI | — |
| Notice Extraction | Gemini | Claude | — |
| Complaint Extraction | Gemini | OpenAI | — |
| Authority Extraction | Gemini | Claude | ✅ Claude |
| Scope Extraction | Gemini | OpenAI | — |
| Deadline Extraction | Gemini | OpenAI | — |
| Property Reconciliation | Gemini | Claude | — |
| Jurisdiction ID | Gemini | OpenAI | — |
| Procedural Analysis | Gemini | Claude | ✅ Claude |
| Jurisdiction Research | Gemini | Claude | — |
| Evidence Gap Analysis | Gemini | OpenAI | — |
| Contradiction Analysis | Gemini | Claude | ✅ Claude |
| Response Strategy | Gemini | Claude | ✅ Claude |
| Draft Generation | Gemini | Claude | — |
| Draft Critique | Claude | OpenAI | — |
| Final Validation | Claude | OpenAI | — |

### Fact Taxonomy

Every claim is classified as one of:
- `VERIFIED_FACT` — independently verified
- `USER_ASSERTION` — user-supplied, unverified
- `INFERENCE` — system-derived reasoning
- `UNKNOWN` — cannot be determined
- `RULE` — official source rule
- `RECOMMENDATION` — system suggestion
- `CONFLICT` — contradictory evidence

### Key Design Principles

1. **User events are USER_ASSERTION until independently verified** — never silently converted to fact
2. **No automatic legal conclusions** — the system never says "the inspection is illegal" or "you can refuse"
3. **Constitutional awareness without universal rules** — Camara and See are referenced with cautions
4. **Jurisdiction must be resolved before jurisdiction-specific conclusions** — McKinleyville is unincorporated Humboldt County
5. **A complaint is not proof of a violation**
6. **"No matching public record" ≠ "There was no call"**
7. **Human authorization required** — no automatic consequential send

## Configuration

### Required Secrets

```
GEMINI_API_KEY=your-gemini-api-key     # DEFAULT provider
OPENAI_API_KEY=your-openai-api-key      # Fallback/independent review
ANTHROPIC_API_KEY=your-claude-api-key   # Fallback/independent review
MAILMYPDF_API_URL=your-mailmypdf-url     # Fulfillment (optional)
MAILMYPDF_API_KEY=your-mailmypdf-key     # Fulfillment (optional)
```

Never commit actual secrets. Use `.env.example` as a template.

## Scripts

```bash
npm test          # Run 71 tests
npm run build     # Production build
npm run verify:launch  # Tests + build
npm run dev       # Dev server
```

## Test Scenario

The primary end-to-end fixture is the McKinleyville, California scenario:

- Notice received recently, addressed to user's reportedly deceased mother
- Allegations: crowing rooster, unpermitted structure, broken vehicles, solid waste, junkyard
- Response deadline: September 3, 2026
- Notice states silence = denial, may seek warrant
- Prior police visit ~2 weeks earlier (USER_ASSERTION, no public record match)

## License

Proprietary — mycomind4-arch

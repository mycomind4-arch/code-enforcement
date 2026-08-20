import { describe, expect, it } from 'vitest'
import { runCodeEnforcementGoldWorkflow, type CodeEnforcementGoldDependencies } from './gold-standard'

const allPass = (): CodeEnforcementGoldDependencies => ({
  'secure-ingest': async () => true,
  classify: async () => true,
  extract: async () => true,
  timeline: async () => true,
  evidence: async () => true,
  discrepancies: async () => true,
  strategy: async () => true,
  draft: async () => true,
  validate: async () => true,
  review: async () => true,
  authorization: async () => true,
  submit: async () => true,
  track: async () => true,
  proof: async () => true,
})

describe('Code Enforcement Gold Standard workflow', () => {
  it('executes the complete procedural lifecycle', async () => {
    const result = await runCodeEnforcementGoldWorkflow(allPass())
    expect(result.status).toBe('completed')
    expect(result.stages.map(stage => stage.stage)).toEqual([
      'secure-ingest', 'classify', 'extract', 'timeline', 'evidence',
      'discrepancies', 'strategy', 'draft', 'validate', 'review',
      'authorization', 'submit', 'track', 'proof',
    ])
  })

  it('blocks before submission when review fails', async () => {
    const dependencies = allPass()
    dependencies.review = async () => false
    const result = await runCodeEnforcementGoldWorkflow(dependencies)

    expect(result.status).toBe('blocked')
    expect(result.stages.at(-1)?.stage).toBe('review')
    expect(result.stages.some(stage => stage.stage === 'submit')).toBe(false)
  })

  it('blocks when procedural evidence analysis fails', async () => {
    const dependencies = allPass()
    dependencies.evidence = async () => false
    const result = await runCodeEnforcementGoldWorkflow(dependencies)

    expect(result.status).toBe('blocked')
    expect(result.stages.at(-1)?.stage).toBe('evidence')
  })

  it('requires proof before completion', async () => {
    const dependencies = allPass()
    dependencies.proof = async () => false
    const result = await runCodeEnforcementGoldWorkflow(dependencies)

    expect(result.status).toBe('blocked')
    expect(result.stages.at(-1)?.stage).toBe('proof')
  })
})

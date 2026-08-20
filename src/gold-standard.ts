export type CodeEnforcementGoldStage =
  | 'secure-ingest'
  | 'classify'
  | 'extract'
  | 'timeline'
  | 'evidence'
  | 'discrepancies'
  | 'strategy'
  | 'draft'
  | 'validate'
  | 'review'
  | 'authorization'
  | 'submit'
  | 'track'
  | 'proof'

export type CodeEnforcementStageResult = {
  stage: CodeEnforcementGoldStage
  status: 'passed' | 'blocked' | 'failed'
  messages: string[]
}

export type CodeEnforcementGoldDependencies = Record<
  CodeEnforcementGoldStage,
  () => Promise<boolean>
>

export async function runCodeEnforcementGoldWorkflow(
  dependencies: CodeEnforcementGoldDependencies,
) {
  const stages: CodeEnforcementStageResult[] = []
  const ordered: CodeEnforcementGoldStage[] = [
    'secure-ingest', 'classify', 'extract', 'timeline', 'evidence',
    'discrepancies', 'strategy', 'draft', 'validate', 'review',
    'authorization', 'submit', 'track', 'proof',
  ]

  for (const stage of ordered) {
    try {
      const passed = await dependencies[stage]()
      stages.push({
        stage,
        status: passed ? 'passed' : 'blocked',
        messages: passed ? [] : [`${stage} gate did not pass`],
      })
      if (!passed) return { status: 'blocked' as const, stages }
    } catch (error) {
      stages.push({
        stage,
        status: 'failed',
        messages: [error instanceof Error ? error.message : String(error)],
      })
      return { status: 'failed' as const, stages }
    }
  }

  return { status: 'completed' as const, stages }
}

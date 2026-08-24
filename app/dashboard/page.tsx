import { CodeEnforcementWorkspace } from '../../src/ui/shell/workspace'

export const metadata = {
  title: 'Case Workspace | Code Enforcement | My-CoMind',
  description: 'Evidence-first command center for code enforcement cases — timeline, evidence, findings, violations, property, workflows, and communications.',
}

export default function Dashboard() {
  return <CodeEnforcementWorkspace />
}

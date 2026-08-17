'use client'

import { useEffect, useMemo, useState } from 'react'

type Evidence = { id: string; name: string; type: string; size: number; added: string }
type CaseData = { address: string; caseNumber: string; jurisdiction: string; deadline: string; violations: string; evidence: Evidence[] }

const emptyCase: CaseData = { address: '', caseNumber: '', jurisdiction: '', deadline: '', violations: '', evidence: [] }

function loadCase(): CaseData {
  if (typeof window === 'undefined') return emptyCase
  try { return JSON.parse(localStorage.getItem('code-enforcement-case') || 'null') || emptyCase } catch { return emptyCase }
}

export default function CaseWorkspace() {
  const [data, setData] = useState<CaseData>(loadCase)
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState('')
  const [analysis, setAnalysis] = useState<string[]>([])

  useEffect(() => { localStorage.setItem('code-enforcement-case', JSON.stringify(data)) }, [data])

  const daysRemaining = useMemo(() => {
    if (!data.deadline) return null
    const d = new Date(`${data.deadline}T23:59:59`)
    return Math.ceil((d.getTime() - Date.now()) / 86400000)
  }, [data.deadline])

  function update(key: keyof CaseData, value: string) {
    setData(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function addFiles(files: FileList | null) {
    if (!files?.length) return
    const additions: Evidence[] = Array.from(files).map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      name: file.name,
      type: file.type || 'unknown',
      size: file.size,
      added: new Date().toISOString(),
    }))
    setData(prev => ({ ...prev, evidence: [...prev.evidence, ...additions] }))
    setNotice(`${additions.length} document${additions.length === 1 ? '' : 's'} added to this case.`)
  }

  function runAnalysis() {
    const findings: string[] = []
    if (!data.address) findings.push('Property address is missing. Confirm the affected parcel before relying on case findings.')
    if (!data.jurisdiction) findings.push('Jurisdiction is missing. Local code and procedural rules cannot be selected yet.')
    if (!data.deadline) findings.push('No deadline has been confirmed from the case record.')
    else if ((daysRemaining ?? 99) < 0) findings.push('The entered deadline has passed. Verify the source document and any extensions immediately.')
    else if ((daysRemaining ?? 99) <= 7) findings.push(`The entered deadline is ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} away. Verify it against the source notice.`)
    if (!data.violations) findings.push('No alleged violation has been recorded yet.')
    if (!data.evidence.length) findings.push('No evidence has been attached. Add the notice first, then supporting records.')
    if (data.evidence.length && !data.evidence.some(e => /notice|violation|citation|order/i.test(e.name))) findings.push('No uploaded filename clearly identifies a notice or violation document. Confirm the primary notice is included.')
    if (!findings.length) findings.push('Basic case completeness checks passed. This is not a legal conclusion; verify extracted facts and governing sources before acting.')
    setAnalysis(findings)
  }

  function resetCase() {
    if (!confirm('Clear this local case workspace?')) return
    setData(emptyCase)
    setAnalysis([])
    setNotice('Case cleared.')
    localStorage.removeItem('code-enforcement-case')
  }

  return <div className="workspace">
    <section className="workspaceHero">
      <div><div className="eyebrow">FUNCTIONAL MVP · EVIDENCE-FIRST CASE WORKSPACE</div><h1>Build the case from the documents.</h1><p>Start with the notice. Add supporting evidence, confirm the key facts, then run completeness checks before you make a consequential decision.</p></div>
      <label className="uploadButton">+ Add evidence<input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx" onChange={e => addFiles(e.target.files)} /></label>
    </section>

    {notice && <div className="notice">{notice}</div>}

    <div className="workspaceGrid">
      <section className="card formCard">
        <div className="section-title"><span>Case facts</span><span className="pill">User confirmed</span></div>
        <p className="muted intro">These fields are intentionally explicit in the first MVP. Later, document extraction can propose values with page-level provenance for you to confirm.</p>
        <label>Property address<input value={data.address} onChange={e => update('address', e.target.value)} placeholder="123 Main Street" /></label>
        <div className="twoCol"><label>Case / notice number<input value={data.caseNumber} onChange={e => update('caseNumber', e.target.value)} placeholder="CE-2026-0001" /></label><label>Jurisdiction<input value={data.jurisdiction} onChange={e => update('jurisdiction', e.target.value)} placeholder="City / County" /></label></div>
        <label>Compliance / response deadline<input type="date" value={data.deadline} onChange={e => update('deadline', e.target.value)} /></label>
        <label>Alleged violations<textarea value={data.violations} onChange={e => update('violations', e.target.value)} placeholder="Describe what the notice says is in violation. Keep the agency's wording where possible." /></label>
        <div className="formActions"><button className="btn primary" onClick={() => { setSaved(true); setNotice('Case facts saved locally in this browser.') }}>Save case</button><button className="btn" onClick={resetCase}>Clear</button></div>
        {saved && <div className="saved">✓ Saved locally</div>}
      </section>

      <aside className="card evidenceCard">
        <div className="section-title"><span>Evidence</span><span className="pill">{data.evidence.length} files</span></div>
        <label className="dropzone">Drop files here or click to add<input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx" onChange={e => addFiles(e.target.files)} /></label>
        {!data.evidence.length ? <p className="muted empty">No evidence yet. The first document should normally be the notice, order, or citation.</p> : <div className="evidenceList">{data.evidence.map(e => <div className="evidenceItem" key={e.id}><div><strong>{e.name}</strong><small>{e.type || 'file'} · {Math.max(1, Math.round(e.size / 1024))} KB</small></div><button className="remove" onClick={() => setData(prev => ({ ...prev, evidence: prev.evidence.filter(x => x.id !== e.id) }))}>Remove</button></div>)}</div>}
      </aside>
    </div>

    <section className="card analysisCard">
      <div className="section-title"><span>Case completeness check</span><button className="btn primary" onClick={runAnalysis}>Run checks</button></div>
      <p className="muted">This first analysis layer checks whether the case contains the minimum information needed for the next workflow. It does not invent ordinance rules or provide a legal conclusion.</p>
      {analysis.length ? <div className="findings">{analysis.map((x, i) => <div className="finding" key={i}><span>{x.startsWith('Basic') ? '✓' : '!'}</span><p>{x}</p></div>)}</div> : <div className="analysisEmpty">Add the notice, confirm the case facts, and run checks.</div>}
    </section>

    <section className="roadmap"><div><div className="eyebrow">WHAT COMES NEXT</div><h2>Advanced intelligence only after the foundation works.</h2><p>The architecture is being shaped around the proven FairProcessMaps pattern: property → evidence → timeline → findings. Document extraction, source-linked timeline generation, jurisdiction rules, and procedural analysis will be added behind this workflow rather than simulated in the UI.</p></div><div className="roadmapList"><span>01 · Document extraction + provenance</span><span>02 · Evidence-linked timeline</span><span>03 · Property / parcel intelligence</span><span>04 · Jurisdiction-specific analysis</span><span>05 · Response + records-request workflows</span></div></section>
  </div>
}

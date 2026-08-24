import Link from 'next/link'
import { colors, typography, radii, spacing } from '../../../src/ui/tokens/tokens'

export const metadata = {
  title: 'Respond to a Code Enforcement Property Inspection Request',
  description: 'Upload your inspection notice. Get evidence-backed analysis, discrepancy detection, multi-LLM review, and a ready-to-mail response.',
}

export default function RespondToInspectionPage() {
  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      {/* Hero */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: `${spacing[8]} ${spacing[5]} ${spacing[6]}`,
      }}>
        <div style={{
          fontSize: typography.xs,
          fontWeight: typography.bold,
          color: colors.accent,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: spacing[3],
        }}>
          Code Enforcement Workflow
        </div>

        <h1 style={{
          fontSize: typography.xxl,
          fontWeight: typography.bold,
          color: colors.textPrimary,
          lineHeight: 1.15,
          marginBottom: spacing[3],
        }}>
          Respond to a Code Enforcement Property Inspection Request
        </h1>

        <p style={{
          fontSize: typography.lg,
          color: colors.textSecondary,
          lineHeight: 1.5,
          marginBottom: spacing[6],
        }}>
          Upload your inspection notice. Get evidence-backed analysis, discrepancy detection, multi-LLM independent review, and a ready-to-mail response — all with full source provenance.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: colors.accent,
              color: '#fff',
              borderRadius: radii.md,
              fontSize: typography.base,
              fontWeight: typography.semibold,
              textDecoration: 'none',
              transition: 'opacity 150ms ease',
            }}
          >
            Start Now →
          </Link>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'transparent',
              color: colors.textSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: radii.md,
              fontSize: typography.base,
              fontWeight: typography.semibold,
              textDecoration: 'none',
            }}
          >
            View Demo Case
          </Link>
        </div>
      </section>

      {/* What it does */}
      <Section title="What it does" number="01">
        <p>This workflow takes a code enforcement inspection request notice and produces a complete, evidence-backed response. It analyzes the notice, identifies discrepancies, researches the applicable authority, and prepares a draft response ready for your review and authorization.</p>
      </Section>

      {/* What you provide */}
      <Section title="What you provide" number="02">
        <ul style={listStyle}>
          <li>The inspection request notice (PDF, photo, or scanned document)</li>
          <li>Any additional evidence (property records, prior correspondence, photos)</li>
          <li>Optional: your account of the situation (timeline, context)</li>
        </ul>
      </Section>

      {/* What it analyzes */}
      <Section title="What it analyzes" number="03">
        <ul style={listStyle}>
          <li><strong>Document classification & extraction</strong> — identifies notice type, agency, jurisdiction, deadline, alleged violations, and recipient</li>
          <li><strong>Recipient / ownership reconciliation</strong> — verifies the notice recipient against property records</li>
          <li><strong>Authority analysis</strong> — identifies the legal basis for the inspection and its scope</li>
          <li><strong>Timeline construction</strong> — builds a fact-classified timeline (verified, user-asserted, inferred, unknown)</li>
          <li><strong>Discrepancy detection</strong> — flags mismatches between the notice and property records, missing authority, complaint reference gaps</li>
          <li><strong>Property intelligence</strong> — resolves address, APN, zoning, permits, and prior cases</li>
        </ul>
      </Section>

      {/* What evidence it checks */}
      <Section title="What evidence it checks" number="04">
        <ul style={listStyle}>
          <li>Notice recipient vs. property owner (county records)</li>
          <li>Cited authority vs. actual jurisdiction ordinances</li>
          <li>Alleged violations vs. complaint reference</li>
          <li>Deadline date vs. response requirements</li>
          <li>Prior enforcement actions on the property</li>
        </ul>
      </Section>

      {/* How AI review works */}
      <Section title="How AI review works" number="05">
        <p>Each finding is independently reviewed by multiple AI models. When models agree, confidence is high. When models disagree, the finding is flagged for human review — you see the disagreement and the evidence behind it.</p>
        <div style={{
          marginTop: '16px',
          padding: '14px 16px',
          background: colors.surface,
          borderRadius: radii.md,
          border: `1px solid ${colors.border}`,
        }}>
          <div style={{ fontSize: typography.xs, fontWeight: typography.semibold, color: colors.accent, marginBottom: '6px' }}>
            INDEPENDENT REVIEW
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: typography.sm, color: colors.textSecondary }}>
            <span>Agreement: <strong style={{ color: colors.statusLow }}>Yes</strong></span>
            <span>Sources: 4</span>
            <span>Confidence: <strong style={{ color: colors.textPrimary }}>High</strong></span>
          </div>
        </div>
        <div style={{
          marginTop: '12px',
          padding: '14px 16px',
          background: colors.surface,
          borderRadius: radii.md,
          border: `1px solid ${colors.statusCritical}30`,
        }}>
          <div style={{ fontSize: typography.xs, fontWeight: typography.semibold, color: colors.statusCritical, marginBottom: '6px' }}>
            INDEPENDENT REVIEW
          </div>
          <div style={{ fontSize: typography.sm, color: colors.textSecondary, marginBottom: '4px' }}>
            Models disagree about the applicable inspection authority.
          </div>
          <div style={{ fontSize: typography.xs, color: colors.statusHigh, fontWeight: typography.semibold }}>
            Human review required.
          </div>
        </div>
      </Section>

      {/* What you receive */}
      <Section title="What you receive" number="06">
        <ul style={listStyle}>
          <li>A complete case workspace with timeline, evidence, findings, and violations</li>
          <li>A draft response document ready for your review</li>
          <li>A high-consequence review panel for any critical findings</li>
          <li>Full source provenance — every fact traces back to a document</li>
          <li>Recommended next actions based on case state</li>
        </ul>
      </Section>

      {/* How mailing works */}
      <Section title="How mailing works" number="07">
        <p>Once you authorize the response, it is mailed via MailMyPDF — our certified mailing service. You receive tracking confirmation and proof of delivery. The mailing is recorded in the case communications log with its tracking number and proof hash.</p>
      </Section>

      {/* CTA */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: `${spacing[6]} ${spacing[5]} ${spacing[10]}`,
        textAlign: 'center',
      }}>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-block',
            padding: '16px 36px',
            background: colors.accent,
            color: '#fff',
            borderRadius: radii.md,
            fontSize: typography.lg,
            fontWeight: typography.semibold,
            textDecoration: 'none',
          }}
        >
          Start Now →
        </Link>
        <p style={{ fontSize: typography.sm, color: colors.textMuted, marginTop: '12px' }}>
          You will be taken to the case workspace. The workflow context is preserved throughout.
        </p>
      </section>
    </div>
  )
}

// ─── Section helper ───────────────────────────────────────────────────────────

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

function Section({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
  return (
    <section style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: `${spacing[5]} ${spacing[5]}`,
      borderTop: `1px solid ${colors.border}`,
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: typography.xs,
          fontWeight: typography.bold,
          color: colors.textMuted,
          minWidth: '24px',
        }}>
          {number}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: typography.lg,
            fontWeight: typography.semibold,
            color: colors.textPrimary,
            marginBottom: '10px',
          }}>
            {title}
          </h2>
          <div style={{ fontSize: typography.base, color: colors.textSecondary, lineHeight: 1.6 }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

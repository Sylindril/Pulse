import { useState } from 'react'
import { motion } from 'motion/react'
import { Activity, Share2, RotateCcw, ArrowLeft, Copy, Check, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSymptomEntries } from '../hooks/useSymptomEntries'
import { TimelineView } from '../components/timeline/TimelineView'
import { generateSummary } from '../lib/summary'

export function DoctorTimeline() {
  const { entries, deleteEntry, editEntry, resetToDemo } = useSymptomEntries()
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const handleShare = () => {
    const token = crypto.randomUUID().slice(0, 8)
    const url = `${window.location.origin}/shared/${token}`
    setShareUrl(url)
  }

  const handleCopy = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const summary = generateSummary(entries)

  return (
    <div className="min-h-screen bg-pulse-darker text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-white transition">
              <ArrowLeft size={20} />
            </Link>
            <Activity className="text-indigo-400" size={24} />
            <div>
              <h1 className="text-xl font-bold">My Timeline</h1>
              <p className="text-xs text-slate-400">Your symptom history</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition ${
                showSummary ? 'bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Quick summary"
            >
              <FileText size={14} />
              Summary
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm transition"
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              onClick={resetToDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition"
              title="Reset to demo data"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </motion.div>

        {/* Summary panel */}
        {showSummary && summary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-4 mb-6"
          >
            <h2 className="text-sm font-semibold text-indigo-300 mb-2">Summary since {summary.periodLabel}</h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{summary.text}</p>
          </motion.div>
        )}

        {/* Share link banner */}
        {shareUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-indigo-900/30 border border-indigo-700/50 rounded-xl p-3 mb-6 flex items-center justify-between"
          >
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-xs text-indigo-300 mb-1">Shareable link (read-only)</p>
              <p className="text-sm text-white truncate font-mono">{shareUrl}</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm transition shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </motion.div>
        )}

        {/* Timeline */}
        <TimelineView entries={entries} onDelete={deleteEntry} onEdit={editEntry} />
      </div>
    </div>
  )
}

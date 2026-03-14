import { useState } from 'react'
import { motion } from 'motion/react'
import { Activity, Share2, RotateCcw, ArrowLeft, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSymptomEntries } from '../hooks/useSymptomEntries'
import { TimelineView } from '../components/timeline/TimelineView'

export function DoctorTimeline() {
  const { entries, resetToDemo } = useSymptomEntries()
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

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
              <h1 className="text-xl font-bold">Patient Timeline</h1>
              <p className="text-xs text-slate-400">Sarah M. — Demo Patient</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
        <TimelineView entries={entries} />
      </div>
    </div>
  )
}

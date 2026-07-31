import { Check } from 'lucide-react'
import type { MoodFaceId } from '@/data/mood-options'

type MoodOptionCardProps = {
  face: MoodFaceId
  label: string
  helper: string
  selected: boolean
  onSelect: () => void
}

export function MoodOptionCard({
  face,
  label,
  helper,
  selected,
  onSelect,
}: MoodOptionCardProps) {
  return (
    <button
      type="button"
      className={selected ? 'mood-option mood-option-selected' : 'mood-option'}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="mood-option-check" aria-hidden="true">
        {selected ? <Check size={16} strokeWidth={3} /> : null}
      </span>
      <div className="mood-option-face" aria-hidden="true">
        {renderMoodFace(face)}
      </div>
      <div className="mood-option-copy">
        <strong>{label}</strong>
        <span>{helper}</span>
      </div>
    </button>
  )
}

function renderMoodFace(face: MoodFaceId) {
  const shared = {
    viewBox: '0 0 96 96',
    className: 'mood-face-svg',
  }

  if (face === 'calm') {
    return (
      <svg {...shared}>
        <circle cx="48" cy="48" r="34" fill="#FFD54F" />
        <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
        <path d="M31 42c3-3 6-4 10-4M55 38c4 0 7 1 10 4" fill="none" stroke="#5B3A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M33 50h6M57 50h6" fill="none" stroke="#5B3A2E" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M35 63c4 3 8 4 13 4 5 0 9-1 13-4" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    )
  }

  if (face === 'happy') {
    return (
      <svg {...shared}>
        <circle cx="48" cy="48" r="34" fill="#FFD54F" />
        <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
        <path d="M31 44c3 4 6 6 10 6 4 0 7-2 10-6M45 44c3 4 6 6 10 6 4 0 7-2 10-6" fill="none" stroke="#5B3A2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M33 60c5 8 10 11 15 11s10-3 15-11" fill="#FFFFFF" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 63h20" stroke="#D96C5F" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (face === 'worried') {
    return (
      <svg {...shared}>
        <circle cx="48" cy="48" r="34" fill="#FFD54F" />
        <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
        <circle cx="36" cy="51" r="3.2" fill="#5B3A2E" />
        <circle cx="60" cy="51" r="3.2" fill="#5B3A2E" />
        <path d="M29 42c4-4 8-6 13-6M54 36c5 0 9 2 13 6" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M38 65c3-2 6-3 10-3 4 0 7 1 10 3" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M67 31l7-7M74 31l-7-7" stroke="#7A8BFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  if (face === 'sad') {
    return (
      <svg {...shared}>
        <circle cx="48" cy="48" r="34" fill="#FFD54F" />
        <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
        <circle cx="36" cy="50" r="3.2" fill="#5B3A2E" />
        <circle cx="60" cy="50" r="3.2" fill="#5B3A2E" />
        <path d="M31 42c4-3 7-4 11-4M54 38c4 0 7 1 11 4" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M37 68c3-4 7-6 11-6 4 0 8 2 11 6" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M64 57c0 4-1 8-4 11" fill="none" stroke="#65AFFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 68c0 3 2 5 4 5s4-2 4-5-2-5-4-7c-2 2-4 4-4 7Z" fill="#65AFFF" />
      </svg>
    )
  }

  if (face === 'tired') {
    return (
      <svg {...shared}>
        <circle cx="48" cy="48" r="34" fill="#FFD54F" />
        <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
        <path d="M31 51h10M55 51h10" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M38 64c4-2 7-3 10-3 3 0 6 1 10 3" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M67 28h8l-5 6h6l-8 9" fill="none" stroke="#7A8BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg {...shared}>
      <circle cx="48" cy="48" r="34" fill="#FFD54F" />
      <circle cx="48" cy="48" r="32" fill="none" stroke="#E3A72F" strokeWidth="3" />
      <circle cx="36" cy="50" r="3.2" fill="#5B3A2E" />
      <circle cx="60" cy="50" r="3.2" fill="#5B3A2E" />
      <path d="M31 42c4-2 7-3 10-3M55 39c3 0 6 1 10 3" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M38 66c4-3 7-4 10-4 3 0 6 1 10 4" fill="none" stroke="#5B3A2E" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M67 61h11" stroke="#AFA6A1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { influenceOptions } from '@/data/influence-options'
import { moodMessages } from '@/data/mood-messages'
import { moodOptions } from '@/data/mood-options'
import { getCurrentPatient } from '@/lib/auth'
import {
  getTodayMoodRecord,
  saveMoodRecord,
} from '@/lib/mood-records'
import type { InfluenceValue, MoodRecord, MoodValue } from '@/types/mood'
import { ExistingMoodRecord } from './ExistingMoodRecord'
import { InfluenceOptionCard } from './InfluenceOptionCard'
import { MoodOptionCard } from './MoodOptionCard'
import { MoodSuccess } from './MoodSuccess'
import { MoodSummary } from './MoodSummary'
import { UnsavedChangesModal } from './UnsavedChangesModal'

type FormErrors = {
  mood?: string
  influence?: string
  otherInfluence?: string
  comment?: string
}

const COMMENT_LIMIT = 500

export function MoodForm() {
  const patient = getCurrentPatient()
  const [mood, setMood] = useState<MoodValue | null>(null)
  const [influence, setInfluence] = useState<InfluenceValue | null>(null)
  const [otherInfluence, setOtherInfluence] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [savedRecord, setSavedRecord] = useState<MoodRecord | null>(null)
  const [existingRecord, setExistingRecord] = useState<MoodRecord | null>(() =>
    getTodayMoodRecord(patient.id) ?? null,
  )
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!showCancelModal) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCancelModal(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [showCancelModal])

  const isDirty = useMemo(
    () =>
      Boolean(mood) ||
      Boolean(influence) ||
      Boolean(otherInfluence.trim()) ||
      Boolean(comment.trim()),
    [comment, influence, mood, otherInfluence],
  )

  const handleCancel = () => {
    if (!isDirty) {
      resetForm()
      return
    }

    setShowCancelModal(true)
  }

  const handleConfirmCancel = () => {
    resetForm()
    setShowCancelModal(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (!mood) {
      nextErrors.mood = 'Selecciona un estado de animo para continuar.'
    }

    if (mood && !influence) {
      nextErrors.influence = 'Selecciona que influye mas en como te sientes hoy.'
    }

    if (influence === 'Otro' && !otherInfluence.trim()) {
      nextErrors.otherInfluence =
        'Cuentanos que esta influyendo en como te sientes.'
    }

    if (comment.length > COMMENT_LIMIT) {
      nextErrors.comment = 'El comentario no puede superar los 500 caracteres.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0 || !mood || !influence) {
      return
    }

    const currentRecord = getTodayMoodRecord(patient.id)

    if (currentRecord) {
      setExistingRecord(currentRecord)
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700)
    })

    const record: MoodRecord = {
      id: crypto.randomUUID(),
      patientId: patient.id,
      mood,
      influence,
      otherInfluence: otherInfluence.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    }

    saveMoodRecord(record)
    setSavedRecord(record)
    setIsSubmitting(false)
    resetFormState()
  }

  if (existingRecord) {
    return <ExistingMoodRecord record={existingRecord} />
  }

  if (savedRecord) {
    return (
      <MoodSuccess
        mood={savedRecord.mood}
        influence={
          savedRecord.influence === 'Otro' && savedRecord.otherInfluence
            ? `Otro: ${savedRecord.otherInfluence}`
            : savedRecord.influence
        }
        createdAt={savedRecord.createdAt}
        message={moodMessages[savedRecord.mood]}
      />
    )
  }

  return (
    <>
      <form className="mood-form" onSubmit={handleSubmit} noValidate>
        <section className="mood-section">
          <div className="section-heading">
            <h3>Selecciona tu estado de animo</h3>
            <p>
              Elige la opcion que mejor represente como te sientes en este
              momento.
            </p>
          </div>
          <div className="mood-options-grid" role="group" aria-label="Estados de animo disponibles">
            {moodOptions.map((option) => (
              <MoodOptionCard
                key={option.value}
                face={option.face}
                label={option.value}
                helper={option.helper}
                selected={mood === option.value}
                onSelect={() => {
                  setMood(option.value)
                  setErrors((current) => ({ ...current, mood: undefined }))
                }}
              />
            ))}
          </div>
          {errors.mood ? <p className="field-error">{errors.mood}</p> : null}
        </section>

        <section
          className={mood ? 'mood-section mood-section-visible' : 'mood-section mood-section-hidden'}
        >
          <div className="section-heading">
            <h3>Que es lo que mas influye en como te sientes hoy?</h3>
            <p>Selecciona una sola opcion por ahora.</p>
          </div>
          <div className="influence-options-grid" role="group" aria-label="Factores que influyen en el estado de animo">
            {influenceOptions.map((option) => (
              <InfluenceOptionCard
                key={option}
                label={option}
                selected={influence === option}
                onSelect={() => {
                  setInfluence(option)
                  setErrors((current) => ({
                    ...current,
                    influence: undefined,
                    otherInfluence: undefined,
                  }))
                }}
              />
            ))}
          </div>
          {errors.influence ? (
            <p className="field-error">{errors.influence}</p>
          ) : null}

          {influence === 'Otro' ? (
            <div className="field-group mood-field-group">
              <label htmlFor="otherInfluence">
                Cuentanos que esta influyendo en como te sientes
              </label>
              <div className="input-frame mood-text-input">
                <input
                  id="otherInfluence"
                  name="otherInfluence"
                  type="text"
                  value={otherInfluence}
                  onChange={(event) => setOtherInfluence(event.target.value)}
                  aria-invalid={Boolean(errors.otherInfluence)}
                />
              </div>
              {errors.otherInfluence ? (
                <p className="field-error">{errors.otherInfluence}</p>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="mood-section">
          <div className="section-heading">
            <h3>Quieres contarnos algo mas?</h3>
            <p>Este campo es opcional.</p>
          </div>
          <div className="field-group mood-field-group">
            <label htmlFor="moodComment">Comentario adicional</label>
            <textarea
              id="moodComment"
              name="moodComment"
              className="mood-textarea"
              maxLength={COMMENT_LIMIT}
              value={comment}
              onChange={(event) => {
                setComment(event.target.value)
                setErrors((current) => ({ ...current, comment: undefined }))
              }}
              aria-describedby="mood-comment-help"
            />
            <div className="textarea-meta" id="mood-comment-help">
              <span>Este campo es opcional</span>
              <span>{comment.length}/{COMMENT_LIMIT}</span>
            </div>
            {errors.comment ? (
              <p className="field-error">{errors.comment}</p>
            ) : null}
          </div>
        </section>

        {mood && influence ? (
          <MoodSummary
            mood={mood}
            influence={influence}
            otherInfluence={otherInfluence}
            comment={comment}
          />
        ) : null}

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button mood-action-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar mi registro'}
          </button>
          <button
            type="button"
            className="secondary-button mood-action-button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>

      <UnsavedChangesModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />
    </>
  )

  function resetForm() {
    resetFormState()
    setErrors({})
  }

  function resetFormState() {
    setMood(null)
    setInfluence(null)
    setOtherInfluence('')
    setComment('')
  }
}

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Search,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BodyMap } from '@/components/symptoms/BodyMap'
import { QuestionRenderer } from '@/components/symptoms/QuestionRenderer'
import { QuickAccessCard } from '@/components/symptoms/QuickAccessCard'
import { SeveritySelector } from '@/components/symptoms/SeveritySelector'
import { SummaryCard } from '@/components/symptoms/SummaryCard'
import { SymptomBottomSheet } from '@/components/symptoms/SymptomBottomSheet'
import { SymptomSearch } from '@/components/symptoms/SymptomSearch'
import { SuccessScreen } from '@/components/symptoms/SuccessScreen'
import { quickAccesses } from '@/data/bodyRegions'
import { severityOptions } from '@/data/severityOptions'
import { symptomQuestions } from '@/data/symptomQuestions'
import { symptoms } from '@/data/symptoms'
import {
  createSymptomRecordId,
  saveSymptomRecord,
} from '@/lib/symptom-records'
import { getCurrentPatient, getAuthSession } from '@/lib/auth'
import type {
  BodyRegionId,
  QuickAccessId,
  SymptomAnswerMap,
  SymptomDefinition,
  SymptomRecord,
} from '@/types/symptoms'

type FlowStep = 'select-region' | 'search' | 'severity' | 'questions' | 'summary' | 'success'

export function SymptomsPage() {
  const navigate = useNavigate()
  const patient = getCurrentPatient()
  const session = getAuthSession()
  const [sheetRegionId, setSheetRegionId] = useState<BodyRegionId | null>(null)
  const [sheetQuickAccessId, setSheetQuickAccessId] = useState<QuickAccessId | null>(null)
  const [activeRegionId, setActiveRegionId] = useState<BodyRegionId | null>(null)
  const [activeQuickAccessId, setActiveQuickAccessId] = useState<QuickAccessId | null>(null)
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomDefinition | null>(null)
  const [selectedSeverityId, setSelectedSeverityId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<SymptomAnswerMap>({})
  const [flowStep, setFlowStep] = useState<FlowStep>('select-region')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedRecord, setSavedRecord] = useState<SymptomRecord | null>(null)

  const regionSymptoms = useMemo(() => {
    if (!sheetRegionId) {
      return [] as SymptomDefinition[]
    }

    return symptoms.filter((symptom) => symptom.regionId === sheetRegionId)
  }, [sheetRegionId])

  const quickSymptoms = useMemo(() => {
    if (!sheetQuickAccessId) {
      return [] as SymptomDefinition[]
    }

    return symptoms.filter((symptom) =>
      symptom.quickAccessIds.includes(sheetQuickAccessId),
    )
  }, [sheetQuickAccessId])

  const searchableSymptoms = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return symptoms
    }

    return symptoms.filter((symptom) => {
      const haystack = [symptom.name, ...symptom.searchTerms].join(' ').toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [searchQuery])

  const activeSeverityOptions = useMemo(() => {
    if (!selectedSymptom) {
      return []
    }

    return (
      severityOptions[selectedSymptom.severityId] ?? severityOptions.default
    )
  }, [selectedSymptom])

  const activeQuestions = useMemo(() => {
    if (!selectedSymptom) {
      return []
    }

    return selectedSymptom.questionIds.flatMap((questionId) => {
      return symptomQuestions[questionId] ?? []
    })
  }, [selectedSymptom])

  const selectedSeverity = activeSeverityOptions.find(
    (option) => option.id === selectedSeverityId,
  )

  const answerSummaries = useMemo(() => {
    return activeQuestions.flatMap((question) => {
      const selectedValue = answers[question.id]
      const option = question.options.find((entry) => entry.value === selectedValue)
      return option ? [option.summaryLabel] : []
    })
  }, [activeQuestions, answers])

  const allQuestionsAnswered = activeQuestions.every((question) => answers[question.id])

  const canMoveToSummary =
    selectedSymptom !== null &&
    selectedSeverity !== undefined &&
    (activeQuestions.length === 0 || allQuestionsAnswered)

  const usesFocusCanvas = flowStep !== 'search'
  const overlayStep =
    flowStep === 'severity' ||
    flowStep === 'questions' ||
    flowStep === 'summary' ||
    flowStep === 'success'
  const visibleRegionSelection = sheetRegionId ?? null

  return (
    <main
      className={
        usesFocusCanvas
          ? 'page-shell symptom-page symptom-page-select'
          : 'page-shell symptom-page'
      }
    >
      {usesFocusCanvas ? (
        <section className="symptom-step-card symptom-step-grid symptom-step-card-compact">
          <div className="symptom-focus-topbar">
            <button
              type="button"
              className="symptom-back-button"
              onClick={() => navigate('/inicio')}
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={18} />
              <span>Volver</span>
            </button>
          </div>

          <div className="symptom-selection-header">
            <div className="section-heading symptom-selection-heading">
              <h2>Como te sientes hoy?</h2>
              <p>Selecciona el area donde tienes molestias o sintomas.</p>
            </div>
          </div>

          <section className="symptom-select-panel">
            <BodyMap
              avatarVariant={session?.user.avatarVariant ?? 'female'}
              selectedRegionId={visibleRegionSelection}
              onSelectRegion={(regionId) => {
                setActiveRegionId(regionId)
                setActiveQuickAccessId(null)
                setSheetQuickAccessId(null)
                setSheetRegionId(regionId)
              }}
            />
          </section>

          <section className="symptom-group-card symptom-group-card-flat">
            <div className="quick-access-grid">
              {quickAccesses.map((item) => (
                <QuickAccessCard
                  key={item.id}
                  item={item}
                  onSelect={() => {
                    setActiveRegionId(null)
                    setActiveQuickAccessId(item.id)
                    setSheetRegionId(null)
                    setSheetQuickAccessId(item.id)
                  }}
                />
              ))}
            </div>
          </section>

          <section className="symptom-search-row">
            <button
              type="button"
              className="search-launch-card"
              onClick={() => {
                setSheetRegionId(null)
                setSheetQuickAccessId(null)
                setFlowStep('search')
              }}
            >
              <span className="search-launch-icon" aria-hidden="true">
                <Search size={18} />
              </span>
              <div>
                <strong>Mi sintoma no aparece en la lista anterior</strong>
              </div>
            </button>
          </section>
        </section>
      ) : null}

      {flowStep === 'search' ? (
        <SymptomSearch
          query={searchQuery}
          results={searchableSymptoms}
          onChangeQuery={setSearchQuery}
          onBack={() => setFlowStep('select-region')}
          onSelectSymptom={(symptom) => {
            chooseSymptom(symptom)
          }}
        />
      ) : null}

      <SymptomBottomSheet
        open={sheetRegionId !== null || sheetQuickAccessId !== null}
        title="Elija el sintoma que esta experimentando"
        symptoms={sheetRegionId ? regionSymptoms : quickSymptoms}
        onClose={() => {
          setSheetRegionId(null)
          setSheetQuickAccessId(null)
        }}
        onSelectSymptom={(symptom) => {
          setSheetRegionId(null)
          setSheetQuickAccessId(null)
          chooseSymptom(symptom)
        }}
      />

      {overlayStep ? (
        <div className="bottom-sheet-layer symptom-flow-layer" role="presentation">
          <div
            className="bottom-sheet-backdrop symptom-flow-backdrop"
            onClick={() => {
              if (flowStep === 'severity') {
                reopenSymptomPicker()
              }
            }}
          />
          <section
            className="bottom-sheet symptom-flow-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="symptom-flow-title"
          >
            <div className="sheet-drag-handle" aria-hidden="true">
              <span />
            </div>

            {flowStep === 'severity' && selectedSymptom ? (
              <SeveritySelector
                symptomName={selectedSymptom.name}
                options={activeSeverityOptions}
                selectedId={selectedSeverityId}
                onBack={() => {
                  setSelectedSeverityId(null)
                  reopenSymptomPicker()
                }}
                onSelect={(optionId) => {
                  setSelectedSeverityId(optionId)

                  if (activeQuestions.length > 0) {
                    setFlowStep('questions')
                  } else {
                    setFlowStep('summary')
                  }
                }}
              />
            ) : null}

            {flowStep === 'questions' && selectedSymptom ? (
              <QuestionRenderer
                questions={activeQuestions}
                answers={answers}
                onBack={() => setFlowStep('severity')}
                onSelectAnswer={(questionId, optionValue) => {
                  const nextAnswers = {
                    ...answers,
                    [questionId]: optionValue,
                  }

                  setAnswers(nextAnswers)

                  const isComplete = activeQuestions.every((question) =>
                    question.id === questionId ? optionValue : nextAnswers[question.id],
                  )

                  if (isComplete) {
                    setFlowStep('summary')
                  }
                }}
              />
            ) : null}

            {flowStep === 'summary' && selectedSymptom && selectedSeverity && canMoveToSummary ? (
              <SummaryCard
                symptomName={selectedSymptom.name}
                severityLabel={selectedSeverity.summaryLabel}
                answerSummaries={answerSummaries}
                onBack={() => {
                  setFlowStep(activeQuestions.length > 0 ? 'questions' : 'severity')
                }}
                onConfirm={() => {
                  const record: SymptomRecord = {
                    id: createSymptomRecordId(),
                    patientId: patient.id,
                    symptomId: selectedSymptom.id,
                    symptomName: selectedSymptom.name,
                    regionId: selectedSymptom.regionId,
                    severityId: selectedSeverity.id,
                    severityLabel: selectedSeverity.summaryLabel,
                    severityLevel: selectedSeverity.severityLevel,
                    answers,
                    createdAt: new Date().toISOString(),
                  }

                  saveSymptomRecord(record)
                  setSavedRecord(record)
                  setFlowStep('success')
                }}
              />
            ) : null}

            {flowStep === 'success' && selectedSymptom && savedRecord ? (
              <SuccessScreen
                symptomName={`${selectedSymptom.name}: ${savedRecord.severityLabel}`}
                successMessage={selectedSymptom.successMessage}
                onManageAgain={() => {
                  setSelectedSymptom(null)
                  setSelectedSeverityId(null)
                  setAnswers({})
                  setSavedRecord(null)
                  setActiveRegionId(null)
                  setActiveQuickAccessId(null)
                  setSheetRegionId(null)
                  setSheetQuickAccessId(null)
                  setFlowStep('select-region')
                }}
              />
            ) : null}
          </section>
        </div>
      ) : null}
    </main>
  )

  function chooseSymptom(symptom: SymptomDefinition) {
    setSheetRegionId(null)
    setSelectedSymptom(symptom)
    setSelectedSeverityId(null)
    setAnswers({})
    setSavedRecord(null)
    setFlowStep('severity')
  }

  function reopenSymptomPicker() {
    setFlowStep('select-region')
    setSelectedSymptom(null)
    setSelectedSeverityId(null)
    setAnswers({})
    setSavedRecord(null)
    setSheetRegionId(activeRegionId)
    setSheetQuickAccessId(activeQuickAccessId)
  }
}

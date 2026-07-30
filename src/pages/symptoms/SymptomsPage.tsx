import { useMemo, useState } from 'react'
import { Activity, ArrowLeft, Search } from 'lucide-react'
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
  const [selectedRegionId, setSelectedRegionId] = useState<BodyRegionId | null>(null)
  const [sheetRegionId, setSheetRegionId] = useState<BodyRegionId | null>(null)
  const [sheetQuickAccessId, setSheetQuickAccessId] = useState<QuickAccessId | null>(null)
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

  return (
    <main
      className={
        flowStep === 'select-region'
          ? 'page-shell symptom-page symptom-page-select'
          : 'page-shell symptom-page'
      }
    >
      {flowStep !== 'select-region' ? (
        <section className="module-hero symptom-hero">
          <div className="module-hero-icon symptom-hero-icon">
            <Activity size={24} aria-hidden="true" />
          </div>
          <div className="module-hero-copy">
            <p className="eyebrow">Registro de sintomas</p>
            <h2>Que estas sintiendo hoy?</h2>
            <p>
              Te guiaremos paso a paso para registrar tu molestia con palabras
              sencillas y opciones faciles de tocar.
            </p>
          </div>
        </section>
      ) : null}

      {flowStep === 'select-region' ? (
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
              <h2>Pulse en el area de incomodidad</h2>
            </div>
          </div>

          <section className="symptom-select-panel">
            <BodyMap
              avatarVariant={session?.user.avatarVariant ?? 'female'}
              selectedRegionId={selectedRegionId}
              onSelectRegion={(regionId) => {
                setSelectedRegionId(regionId)
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
              onClick={() => setFlowStep('search')}
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

      {flowStep === 'severity' && selectedSymptom ? (
        <SeveritySelector
          symptomName={selectedSymptom.name}
          options={activeSeverityOptions}
          selectedId={selectedSeverityId}
          onBack={() => {
            setSelectedSeverityId(null)
            setFlowStep('select-region')
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
    </main>
  )

  function chooseSymptom(symptom: SymptomDefinition) {
    setSelectedSymptom(symptom)
    setSelectedSeverityId(null)
    setAnswers({})
    setSavedRecord(null)
    setFlowStep('severity')
  }
}

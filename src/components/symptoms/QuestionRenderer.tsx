import type { SymptomAnswerMap, SymptomQuestion } from '@/types/symptoms'

type QuestionRendererProps = {
  questions: SymptomQuestion[]
  answers: SymptomAnswerMap
  onBack: () => void
  onSelectAnswer: (questionId: string, optionValue: string) => void
}

export function QuestionRenderer({
  questions,
  answers,
  onBack,
  onSelectAnswer,
}: QuestionRendererProps) {
  return (
    <section className="symptom-step-card">
      <button type="button" className="text-link step-back-link" onClick={onBack}>
        Volver
      </button>
      <div className="section-heading">
        <h2>Queremos entender un poco mejor</h2>
        <p>Responde con la opcion que mas se parezca a lo que estas viviendo.</p>
      </div>

      <div className="question-stack">
        {questions.map((question) => (
          <section key={question.id} className="question-card">
            <h3>{question.prompt}</h3>
            <div className="question-options">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      selected
                        ? 'question-option question-option-selected'
                        : 'question-option'
                    }
                    aria-pressed={selected}
                    onClick={() => onSelectAnswer(question.id, option.value)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

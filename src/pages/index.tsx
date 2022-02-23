import { NextPage } from "next";
import { useCallback, useState } from "react";
import styles from '../styles/index.module.css'

const WordleIndexPage: NextPage = () => {
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])

  const [showAnswer, setShowAnswer] = useState(false)

  const rightAnswer = process.env.ANSWER

  const letterClass = useCallback((letter: string, index: number) => {
    if (rightAnswer[index] === letter) {
      return styles.right
    }
    if (rightAnswer.includes(letter)) {
      return styles.near
    }

    return styles.wrong
  }, [])

  const onClickSubmit = useCallback(() => {
    if (answer.length !== 5) {
      return
    }

    setAnswer('')
    if (answers.length === 4) {
      setShowAnswer(true)
    }

    setAnswers([...answers, answer])
  }, [answer, setAnswer, answers, setAnswers])

  return (
    <div>
      <h1>wordle-again</h1>

      {answers.length < 5 ? <>
        <input
          className={styles.wordInput}
          type="text"
          placeholder="input answer here"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={() => onClickSubmit()}
        >
          submit
        </button>
      </> : null}

      {showAnswer ? <span>answer: {rightAnswer}</span> : null}

      {answers.map((a, index) => (
        <>
          <p key={index}>
            <span className={letterClass(a[0], 0)}>{a[0]}</span>
            <span className={letterClass(a[1], 1)}>{a[1]}</span>
            <span className={letterClass(a[2], 2)}>{a[2]}</span>
            <span className={letterClass(a[3], 3)}>{a[3]}</span>
            <span className={letterClass(a[4], 4)}>{a[4]}</span>
          </p>
        </>
      ))}
    </div>
  )
}

export default WordleIndexPage
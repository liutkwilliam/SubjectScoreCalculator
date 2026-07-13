import { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { Inputs } from './InputField'
import ItemEntry from './ItemEntry'
import Buttons from './Buttons'
import { GRID_COLS } from '../config/constant'
import Notes from './Notes'

const createItem = () => ({
    id: crypto.randomUUID(),
    name: '',
    hurdleTask: false,
    weighting: '',
    score: '',
    maxScore: '',
})

const FORM_COOKIE_NAME = 'subject-score-calculator-form'

const createEmptyForm = () => ({
    subjectName: '',
    items: [createItem()],
})

const cleanSavedItem = (item) => ({
    id: crypto.randomUUID(),
    name: item?.name ?? '',
    hurdleTask: Boolean(item?.hurdleTask),
    weighting: item?.weighting ?? '',
    score: item?.score ?? '',
    maxScore: item?.maxScore ?? '',
})

const getSavedForm = () => {
    const savedForm = Cookies.get(FORM_COOKIE_NAME)

    if (!savedForm) {
        return createEmptyForm()
    }

    try {
        const parsedForm = JSON.parse(savedForm)
        const savedItems = Array.isArray(parsedForm.items)
            ? parsedForm.items.map(cleanSavedItem)
            : []

        return {
            subjectName: parsedForm.subjectName ?? '',
            items: savedItems.length > 0 ? savedItems : [createItem()],
        }
    } catch {
        Cookies.remove(FORM_COOKIE_NAME)
        return createEmptyForm()
    }
}

const getActualScore = (item) => {
    const weighting = Number(item.weighting)
    const score = Number(item.score)
    const maxScore = Number(item.maxScore)

    if (!item.weighting || !item.score || !item.maxScore || maxScore <= 0) {
        return 0
    }

    const result = (score / maxScore) * weighting
    return Number.isFinite(result) ? result : 0
}

const getActualScoreDisplay = (item) => {
    if (!item.weighting || !item.score || !item.maxScore || Number(item.maxScore) <= 0) {
        return ''
    }

    return getActualScore(item).toFixed(2)
}

const hasFailedHurdle = (item) => {
    const score = Number(item.score)
    const maxScore = Number(item.maxScore)

    if (!item.hurdleTask || !item.score || !item.maxScore || maxScore <= 0) {
        return false
    }

    return (score / maxScore) * 100 < 40
}

export default function ScoreCalc() {
    const [form, setForm] = useState(getSavedForm)
    const { subjectName, items } = form

    useEffect(() => {
        Cookies.set(FORM_COOKIE_NAME, JSON.stringify({
            subjectName,
            items,
        }), { expires: 30, sameSite: 'strict' })
    }, [subjectName, items])

    const totals = useMemo(() => {
        const summary = items.reduce(
            (currentSummary, item) => ({
                weighting: currentSummary.weighting + (Number(item.weighting) || 0),
                actualScore: currentSummary.actualScore + getActualScore(item),
                failedHurdle: currentSummary.failedHurdle || hasFailedHurdle(item),
            }),
            { weighting: 0, actualScore: 0, failedHurdle: false },
        )

        return {
            ...summary,
            finalScore: summary.failedHurdle && summary.actualScore >= 45
                ? 45
                : summary.actualScore,
        }
    }, [items])

    const hasWeightingWarning = Math.abs(totals.weighting - 100) > 0.001

    const gradeFromScore = (score) => {
        if (score >= 85) return 'High Distinction'
        if (score >= 75) return 'Distinction'
        if (score >= 65) return 'Credit'
        if (score >= 50) return 'Pass'
        return 'Fail'
    }

    const addItem = () => {
        setForm((currentForm) => ({
            ...currentForm,
            items: [...currentForm.items, createItem()],
        }))
    }

    const updateItem = (id, field, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            items: currentForm.items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item,
            ),
        }))
    }

    const removeItem = (id) => {
        setForm((currentForm) => ({
            ...currentForm,
            items: currentForm.items.filter((item) => item.id !== id),
        }))
    }

    const resetForm = () => {
        const confirmReset = window.confirm('Are you sure you want to reset the form? This will clear all data.')
        if (!confirmReset) {
            return
        }
        Cookies.remove(FORM_COOKIE_NAME)
        setForm(createEmptyForm())
    }

    return (
        <>
            <div className="p-4 gap-4 bg-blue-200 rounded-xl min-h-[70vh]">
                <div className="items-center justify-center gap-4">
                    <Inputs
                        label="Subject Name"
                        placeholder="Enter Subject Name"
                        value={subjectName}
                        onChange={(event) =>
                            setForm((currentForm) => ({
                                ...currentForm,
                                subjectName: event.target.value,
                            }))
                        }
                    />
                    <div className={`mt-4 grid ${GRID_COLS} gap-2 `}>
                        <p>Assessment Item</p>
                        <p className={`text-center`}>Hurdle Task</p>
                        <p>Weighting %</p>
                        <p>Score</p>
                        <p>Max Score</p>
                        <p>Actual Score (%)</p>
                        <p>Actions</p>
                        {items.map((item) => (
                            <ItemEntry
                                key={item.id}
                                item={item}
                                actualScore={getActualScoreDisplay(item)}
                                onChange={(field, value) => updateItem(item.id, field, value)}
                                onRemove={() => removeItem(item.id)}
                                canRemove={items.length > 1}
                            />
                        ))}
                    </div>
                    <div className="my-2 flex gap-2">
                        <Buttons
                            type="button"
                            onClick={addItem}
                            buttonColor="bg-blue-500 hover:bg-blue-600"
                            content="Add Item"
                        />
                        <Buttons
                            type="button"
                            onClick={resetForm}
                            buttonColor="bg-slate-500 hover:bg-slate-600"
                            content="Reset Form"
                        />
                    </div>
                </div>

                <div className={`grid grid-cols-3 gap-2`}>
                    <p>Total Weighting (%): {totals.weighting.toFixed(0)}</p>
                    <p>Total Actual Score (%): {totals.finalScore.toFixed(0)}</p>
                    <p>Grade: {totals.weighting == 100 ? gradeFromScore(totals.finalScore) : "Calculating"}</p>
                </div>
                {totals.failedHurdle && totals.actualScore >= 45 && (
                    <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                        A hurdle task is below 40%, so the final score is capped at 45%.
                        Raw total: {totals.actualScore.toFixed(0)}%.
                    </p>
                )}
                {hasWeightingWarning && (
                    <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                        Total weighting must equal 100%. Current total is {totals.weighting.toFixed(2)}%.
                    </p>
                )}
                <Notes />
            </div>
        </>
    )
}

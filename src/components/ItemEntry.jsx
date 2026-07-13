import Buttons from "./Buttons";
import { Inputs } from "./InputField";

export default function ItemEntry({ item, actualScore, onChange, onRemove, canRemove }) {
  return (
    <>
      <Inputs
        placeholder="Enter Assessment Item"
        value={item.name}
        onChange={(event) => onChange("name", event.target.value)}
      />
      <div className="flex h-full min-h-10 items-center justify-center">
        <input
          type="checkbox"
          className="h-8 w-8 rounded border-gray-100 accent-blue-500"
          checked={item.hurdleTask}
          onChange={(event) => onChange("hurdleTask", event.target.checked)}
        />
      </div>
      <Inputs
        placeholder="Enter Weighting %"
        type="number"
        min="0"
        value={item.weighting}
        onChange={(event) => onChange("weighting", event.target.value)}
      />
      <Inputs
        placeholder="Enter Score"
        type="number"
        min="0"
        value={item.score}
        onChange={(event) => onChange("score", event.target.value)}
      />
      <Inputs
        placeholder="Enter Max Score"
        type="number"
        min="0"
        value={item.maxScore}
        onChange={(event) => onChange("maxScore", event.target.value)}
      />
      <p>{actualScore ? actualScore : 0}</p>
      <Buttons
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        buttonColor="bg-red-500 hover:bg-red-600"
        content="Remove"
      />
    </>
  )
}

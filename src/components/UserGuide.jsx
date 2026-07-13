import Buttons from "./Buttons";

export default function UserGuide({ onClose }) {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900/60 px-4">
            <div className="flex max-w-2xl flex-col gap-2 rounded-md bg-blue-200 px-4 py-4 text-sm text-gray-800 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">User Guide</p>
                    <Buttons
                        type="button"
                        onClick={onClose}
                        buttonColor="bg-gray-500 hover:bg-gray-600"
                    >
                        Close
                    </Buttons>
                </div>
                <ul className="list-disc list-inside">
                    <li>To add an assessment item, click the "Add Item" button. To remove an item, click the "Remove" button next to the item.</li>
                    <li>Hurdle Task: If checked, the item is a hurdle task. If the score is below 40% of the total score, the overall score will only be capped at 40%.</li>
                    <li>Weighting %: The weighting of the item in percentage. The total weighting of all items should be 100%.</li>
                    <li>Score: The score obtained for the item.</li>
                    <li>Max Score: The maximum score for the item.</li>
                    <li>Actual Score (%): The actual score for the item in percentage, calculated as (Score / Max Score) * Weighting %.</li>
                    <li>Grade: The fianl grade is calculated based on the total actual score. The grading scale is as follows:
                        <ul className="pl-5 list-disc list-inside">
                            <li>85% and above: High Distinction</li>
                            <li>75% - 84%: Distinction</li>
                            <li>65% - 74%: Credit</li>
                            <li>D: 50% - 64%: Pass</li>
                            <li>F: Below 50%: Fail</li>
                        </ul>
                    </li>
                    <li>Reset Form: Resets the form will clear any data input.</li>
                    <li>The calculator is designed for subjects with a single pass requirement. If your subject has multiple pass requirements, please use the calculator for each requirement separately.</li>
                </ul>
                <p className="mt-2">Disclaimer: This calculator is for educational purposes only. Please verify your results with your institution's official grading policies.</p>
            </div>
        </div>
    )
}

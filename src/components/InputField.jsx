import { INPUT_STYLE } from "../config/constant";


export function Label({ label }) {
    return (
        <>
            {label && (
                <label className="text-sm font-medium">
                    {label}
                </label>
            )}
        </>
    )
}

export function Checkbox({ label, checked, onChange, ...props }) {
    return (
        <> 
            <div className="flex items-center gap-2">
                {label && <Label label={label} />}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className={`${INPUT_STYLE}`} {...props}
                />
            </div>
        </>
    )
}
        

export function Dropdown({ label, value, onChange, children }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                {label && <Label label={label} />}
                <select name="category" value={value} onChange={onChange} className={`px-3 py-2 w-full ${INPUT_STYLE}`}>
                    {children}
                </select>
            </div>
        </>
    )
}

export function Textarea({ label, ...props }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                {label && <Label label={label} />}
                <textarea
                    placeholder="Content (Markdown supported)"
                    className={`min-h-50 px-3 py-2 w-full ${INPUT_STYLE}`}
                    {...props}
                />
            </div>
        </>
    );
}


export function Inputs({ label, ...props }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                {label && <Label label={label} />}
                <input
                    className={`px-3 py-2 w-full ${INPUT_STYLE}`}
                    {...props}
                />
            </div>
        </>
    );
}

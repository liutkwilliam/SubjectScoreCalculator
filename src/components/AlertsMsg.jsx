

export default function AlertsMsg({ color, message }) {
    return (
        <>
            <p className={`mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm ${color}`}>{message}</p>
        </>
    )
}

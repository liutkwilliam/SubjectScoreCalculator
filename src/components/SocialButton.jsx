export default function SocialButton({href, Icon, ariaLabel}) {
    return (
        <>
            <a href={href} className="text-xl hover:text-blue-500" target="_blank" rel="noreferrer" aria-label={ariaLabel}>
                {Icon}
            </a>
        </>
    )
}

import { FaGithub } from "react-icons/fa";
import SocialButton from './SocialButton';

export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-gray-500">
            <p>© 2026 Subject Score Calculator. All rights reserved.</p>
            <p>Created by <a href="https://www.liutkwilliam.com" className="text-blue-500 hover:underline">William Liu</a></p>
            <a
                href="https://www.github.com/liutkwilliam/"
                className="ml-2 text-slate-500 hover:text-blue-500"
                target="_blank" rel="noopener noreferrer"
            >
                <SocialButton Icon={<FaGithub />} />
            </a>
        </div>
    )
}

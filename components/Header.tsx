import Image from "next/image";
import Link from "next/link";

function Header() {
    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-5 shadow-md">
            {/* left */}
            <div className="flex items-center space-x-2">
                <Image src="/chat-gpt.png" alt="logo" height={30} width={30} />

                <div>
                    <h1 className="font-bold">
                        The Raghu <span className="text-violet-500">AI</span>{" "}
                        Image Generator
                    </h1>
                    <h2 className="text-xs">
                        Powered by DALL·E 2, Chat GPT & Microsoft Azure!
                    </h2>
                </div>
            </div>

            {/* right */}
            <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
                <Link
                    href="https://www.papareact.com"
                    className="px-2 text-right font-light"
                >
                    Follow Us On LinkedIn
                </Link>
                <Link
                    href="https://github.com/raghuraj-dev"
                    className="px-2 font-light"
                >
                    Github Repo
                </Link>
            </div>
        </header>
    );
}
export default Header;

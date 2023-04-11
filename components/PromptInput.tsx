"use client";

import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { useState } from "react";
import useSWR from "swr";

function PromptInput() {
    const [input, setInput] = useState("");

    const {
        data: suggestion,
        isLoading,
        mutate,
        isValidating,
    } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false,
    });

    return (
        <div className="m-10">
            <form className="flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a prompt..."
                    className="flex-1 rounded-md p-4 outline-none"
                />
                <button
                    type="submit"
                    className={`p-4 font-bold ${
                        input
                            ? "bg-violet-500 text-white transition-colors duration-200"
                            : "cursor-not-allowed text-gray-300"
                    }`}
                    disabled={!input}
                >
                    Generate
                </button>
                <button
                    type="button"
                    className="bg-violet-400 p-4 font-bold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300"
                >
                    Use Suggestion
                </button>
                <button
                    type="button"
                    className="rounded-b-md border-none bg-white p-4 font-bold text-violet-400 transition-colors duration-200 md:rounded-r-md md:rounded-bl-none"
                >
                    New Suggestion
                </button>
            </form>
        </div>
    );
}
export default PromptInput;

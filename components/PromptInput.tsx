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

    const loading = isLoading || isValidating;

    return (
        <div className="m-10">
            <form className="flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        (loading && "ChatGPT is thinking of a suggestion...") ||
                        suggestion ||
                        "Enter a prompt..."
                    }
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
                    onClick={mutate}
                >
                    New Suggestion
                </button>
            </form>

            {input && (
                <p className="pl-2 pt-2 font-light italic">
                    Suggestion:{" "}
                    <span className="text-violet-500">
                        {loading ? "ChatGPT is thinking..." : suggestion}
                    </span>
                </p>
            )}
        </div>
    );
}
export default PromptInput;

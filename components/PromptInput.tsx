"use client";

import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";

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

    const { mutate: updateImages } = useSWR("images", fetchImages, {
        revalidateOnFocus: false,
    });

    const submitPrompt = async (useSuggestion?: boolean) => {
        const inputPrompt = input;
        setInput("");

        // p is the prompt to send to API
        const p = useSuggestion ? suggestion : inputPrompt;

        const notificationPrompt = p;
        const notificationPromptShort = notificationPrompt.slice(0, 20);

        const notification = toast.loading(`DALL·E is creating: ${notificationPromptShort}...`);

        const res = await fetch("/api/generateImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: p }),
        });

        const data = await res.json();

        if (data.error) {
            toast.error(data.error, {
                id: notification,
            });
        } else {
            toast.success("Your AI Art has been generated!", {
                id: notification,
            });
        }

        updateImages();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await submitPrompt();
    };

    const loading = isLoading || isValidating;

    return (
        <div className="m-10">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x"
            >
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        (loading && "ChatGPT is thinking of a suggestion...") || suggestion || "Enter a prompt..."
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
                    onClick={() => submitPrompt(true)}
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
                    <span className="text-violet-500">{loading ? "ChatGPT is thinking..." : suggestion}</span>
                </p>
            )}
        </div>
    );
}
export default PromptInput;

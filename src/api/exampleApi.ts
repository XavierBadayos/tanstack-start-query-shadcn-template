import type { ExampleType } from "@/types/exampleType";
import { createServerFn } from "@tanstack/react-start";

export const fetchFromExampleApi = createServerFn({method: "GET"})
    .handler(async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/posts`);

        if(!response.ok) {
            throw new Error(`failed to fetch user posts`);
        }

        const data: ExampleType[] = await response.json(); 
        return data;
    });
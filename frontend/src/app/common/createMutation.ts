import { Signal, signal } from "@angular/core";
import { Observable, take } from "rxjs";

export type Mutation<T, B> = {
    loading: boolean;
    error: string | undefined;
    data: T | undefined;
    mutate: (b: B, onComplete?: () => void) => void;
}

export function createMutation<T, B>(mutater: (b: B) => Observable<T>): Signal<Mutation<T, B>> {
    const mutation = signal<Mutation<T, B>>({
        loading: false,
        error: undefined,
        data: undefined,
        mutate: (b: B, onComplete?: () => void) => { }
    });

    function mutate(b: B, onComplete?: () => void) {
        mutation.update(m => ({ ...m, loading: true, error: undefined, data: undefined }))

        mutater(b).pipe(take(1)).subscribe({
            next: data => mutation.update(m => ({ ...m, data: data, loading: false })),
            error: e => mutation.update(m => ({
                ...m,
                loading: false,
                error: typeof e === 'string' ? e : (e as any).message ?? 'Unknown error',
            })),
            complete: onComplete
        });
    }

    mutation.update(m => ({ ...m, mutate: mutate }));

    return mutation;
}
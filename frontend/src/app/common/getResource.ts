import { signal, Signal } from "@angular/core";
import { Observable, Subscription, take } from "rxjs";

export type Resource<T> = {
    loading: boolean;
    error: string | undefined;
    data: T | undefined;
    refetch: () => void;
}

export function getResource<T>(loader: () => Observable<T>): Signal<Resource<T>> {
    const resource = signal<Resource<T>>({
        loading: true,
        data: undefined,
        error: undefined,
        refetch: () => { },
    });

    let subscription: Subscription | undefined;

    function refetch() {
        resource.update(r => ({ ...r, loading: true, error: undefined, data: undefined }));

        subscription?.unsubscribe();

        subscription = loader().pipe(take(1)).subscribe({
            next: data => resource.update(r => ({ ...r, loading: false, data, error: undefined })),
            error: e => resource.update(r => ({
                ...r,
                loading: false,
                error: typeof e === 'string' ? e : (e as any).message ?? 'Unknown error',
            }))
        });
    }

    resource.update(r => ({ ...r, refetch }));
    refetch();

    return resource;
}

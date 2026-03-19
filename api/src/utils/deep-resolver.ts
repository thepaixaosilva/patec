async function deepResolvePromises<T>(input: T): Promise<T> {
    if (input instanceof Promise) {
        return (await input) as T;
    }

    if (Array.isArray(input)) {
        return (await Promise.all(
            input.map((item) => deepResolvePromises(item)),
        )) as T;
    }

    if (input instanceof Date) {
        return input;
    }

    if (typeof input === 'object' && input !== null) {
        const keys = Object.keys(input);
        const resolvedObject: Record<string, unknown> = {};

        for (const key of keys) {
            const resolvedValue = await deepResolvePromises(
                (input as Record<string, unknown>)[key],
            );
            resolvedObject[key] = resolvedValue;
        }
        return resolvedObject as T;
    }

    return input;
}

export default deepResolvePromises;
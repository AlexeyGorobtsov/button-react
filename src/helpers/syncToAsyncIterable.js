export async function* syncToAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
        yield elem;
    }
}
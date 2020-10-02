export async function* mapAsync(asyncIterable, func) {
    let index = 0;
    for await (const x of asyncIterable) {
        yield func(x, index);
        index++;
    }
}
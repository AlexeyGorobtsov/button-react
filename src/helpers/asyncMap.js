export function asyncMap({array, callback, ref}) {
    let i = 0;
    const length = array.length;

    function for1() {
        ref.push(callback(array[i]))
        for2();
    }

    function for2() {
        if (i === length) {
            return false;
        }
        setTimeout(function() {
            i++;
            for1();
        }, 0);
    }
    for1();
}
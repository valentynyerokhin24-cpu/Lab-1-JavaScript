
const SortLib = {
    // Внутрішній метод для виводу статистики в консоль [cite: 33, 35]
    _logStats: function(methodName, comparisons, swaps, hasUndefined) {
        console.log(`%c--- ${methodName} ---`, "color: #007bff; font-weight: bold;");
        console.log(`Кількість порівнянь: ${comparisons}`);
        console.log(`Кількість обмінів/переміщень: ${swaps}`);
        if (hasUndefined) {
            console.warn("Повідомлення: У масиві виявлено undefined-елементи. Їх переміщено в кінець.");
        }
    },

    // Метод для обробки розріджених масивів 
    // Відокремлює undefined, щоб алгоритми сортування працювали лише з числами
    _prepareArray: function(arr) {
        let hasUndefined = false;
        const clean = [];
        const undefs = [];
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                hasUndefined = true;
                undefs.push(undefined);
            } else {
                clean.push(arr[i]);
            }
        }
        return { clean, undefs, hasUndefined };
    },

    // 1. Сортування обміном (Bubble Sort) [cite: 27]
    bubbleSort: function(array, ascending = true) {
        let { clean, undefs, hasUndefined } = this._prepareArray(array);
        let n = clean.length;
        let comp = 0, swap = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comp++;
                const condition = ascending ? clean[j] > clean[j + 1] : clean[j] < clean[j + 1];
                if (condition) {
                    [clean[j], clean[j + 1]] = [clean[j + 1], clean[j]];
                    swap++;
                }
            }
        }
        this._logStats("Метод обміну", comp, swap, hasUndefined);
        return [...clean, ...undefs];
    },

    // 2. Метод мінімальних елементів (Selection Sort) [cite: 28]
    selectionSort: function(array, ascending = true) {
        let { clean, undefs, hasUndefined } = this._prepareArray(array);
        let n = clean.length;
        let comp = 0, swap = 0;

        for (let i = 0; i < n - 1; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                comp++;
                const condition = ascending ? clean[j] < clean[targetIdx] : clean[j] > clean[targetIdx];
                if (condition) targetIdx = j;
            }
            if (targetIdx !== i) {
                [clean[i], clean[targetIdx]] = [clean[targetIdx], clean[i]];
                swap++;
            }
        }
        this._logStats("Метод мінімальних елементів", comp, swap, hasUndefined);
        return [...clean, ...undefs];
    },

    // 3. Метод вставок (Insertion Sort) [cite: 29]
    insertionSort: function(array, ascending = true) {
        let { clean, undefs, hasUndefined } = this._prepareArray(array);
        let n = clean.length;
        let comp = 0, swap = 0;

        for (let i = 1; i < n; i++) {
            let key = clean[i];
            let j = i - 1;
            while (j >= 0) {
                comp++;
                const condition = ascending ? clean[j] > key : clean[j] < key;
                if (condition) {
                    clean[j + 1] = clean[j];
                    j--;
                    swap++;
                } else break;
            }
            clean[j + 1] = key;
        }
        this._logStats("Метод вставок", comp, swap, hasUndefined);
        return [...clean, ...undefs];
    },

    // 4. Метод Шелла [cite: 30]
    shellSort: function(array, ascending = true) {
        let { clean, undefs, hasUndefined } = this._prepareArray(array);
        let n = clean.length;
        let comp = 0, swap = 0;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = clean[i];
                let j = i;
                while (j >= gap) {
                    comp++;
                    const condition = ascending ? clean[j - gap] > temp : clean[j - gap] < temp;
                    if (condition) {
                        clean[j] = clean[j - gap];
                        j -= gap;
                        swap++;
                    } else break;
                }
                clean[j] = temp;
            }
        }
        this._logStats("Метод Шелла", comp, swap, hasUndefined);
        return [...clean, ...undefs];
    },

    // 5. Метод Хоара (Quick Sort) [cite: 31]
    quickSort: function(array, ascending = true) {
        let { clean, undefs, hasUndefined } = this._prepareArray(array);
        let comp = 0, swap = 0;

        const sort = (arr, left, right) => {
            if (left >= right) return;
            let i = left, j = right;
            let pivot = arr[Math.floor((left + right) / 2)];

            while (i <= j) {
                while (ascending ? arr[i] < pivot : arr[i] > pivot) { i++; comp++; }
                while (ascending ? arr[j] > pivot : arr[j] < pivot) { j--; comp++; }
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    i++; j--; swap++;
                }
            }
            if (left < j) sort(arr, left, j);
            if (i < right) sort(arr, i, right);
        };

        if (clean.length > 0) sort(clean, 0, clean.length - 1);
        this._logStats("Метод Хоара", comp, swap, hasUndefined);
        return [...clean, ...undefs];
    }
};

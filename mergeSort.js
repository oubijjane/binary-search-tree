function mergeSort(array) {
  // Base case: If the array has 1 or 0 elements, it's already sorted.
  if (array.length <= 1) {
    return array;
  }

  // Split the array into two halves.
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  // Recursively sort both halves and merge them.
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  // Compare elements from both halves and merge them in sorted order.
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else if (left[i] === right[j]) {
      result.push(left[i]);
      i++;
      j++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append any remaining elements from the left or right arrays.
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
/* const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = mergeSort(array);
console.log(sortedArray); // Output: [2, 2, 5, 6, 7, 9, 10, 95] */

export { mergeSort };

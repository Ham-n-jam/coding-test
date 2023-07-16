using System;

namespace PartAPuzzle2
{
    public class WordUtils
    {

        /// <summary>
        /// Reverses each individual word in a string, leaving whitespace as-is.
        /// </summary>
        /// <param name="text"></param>
        /// <returns>The string of reversed words</returns>
        public static string ReverseWords(string text)
        {
            var chars = text.ToCharArray();
            var startOfWordIdx = 0;

            for (var i = 0; i < chars.Length; i++)
            {
                if (Char.IsWhiteSpace(chars[i]))
                {
                    // Reached end of current word, reverse it
                    ReverseCharSubArray(chars, startOfWordIdx, i - 1);
                    startOfWordIdx = i + 1;
                }
            }

            // Reverse the final word in the string if the string does not end in whitespace
            if (startOfWordIdx < chars.Length - 1)
            {
                ReverseCharSubArray(chars, startOfWordIdx, chars.Length - 1);
            }

            return new string(chars);
        }


        /// <summary>
        /// In-place reverses the contents of the inputArray between (and including) the startIdx to endIdx.
        /// Does not modify anything if startIdx >= endIdx.
        /// </summary>
        /// <param name="inputArray">Array to modify</param>
        /// <param name="startIdx">Start index of sub-array</param>
        /// <param name="endIdx">End index of sub-array</param>
        private static void ReverseCharSubArray(char[] inputArray, int startIdx, int endIdx)
        {
            var i = startIdx;
            var j = endIdx;

            while (i < j)
            {
                var bufferVal = inputArray[i];

                inputArray[i] = inputArray[j];
                inputArray[j] = bufferVal;
                i++;
                j--;
            }
        }

    }
}

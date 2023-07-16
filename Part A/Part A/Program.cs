using System;

namespace PartAPuzzle2
{
    class Program
    {
        static void Main(string[] args)
        {
            foreach (var arg in args)
            {
                Console.WriteLine(WordUtils.ReverseWords(arg));
            }
        }
    }
}

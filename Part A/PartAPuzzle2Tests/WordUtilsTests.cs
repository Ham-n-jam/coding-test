using Microsoft.VisualStudio.TestTools.UnitTesting;
using PartAPuzzle2;

namespace PartAPuzzle2Tests
{
    [TestClass]
    public class WordUtilsTests
    {
        [TestMethod]
        [DataRow("a", "a")]
        [DataRow(" a", " a")]
        [DataRow("", "")]
        [DataRow(" ", " ")]
        [DataRow(" \n\t", " \n\t")]
        [DataRow("123", "321")]
        [DataRow("123 ", "321 ")]
        [DataRow(" 123", " 321")]
        [DataRow("1 2 3", "1 2 3")]
        [DataRow("123 456", "321 654")]
        [DataRow("123 \n456", "321 \n654")]
        [DataRow("   abcd e ", "   dcba e ")]
        public void ReverseWords_WithValidString_ReversesOnlyWords(string inputStr, string expected)
        {
            // Act
            var result = WordUtils.ReverseWords(inputStr);

            // Assert
            Assert.AreEqual(result, expected);
        }

    }
}

using System.Text;

namespace TestDecoding 
{
    internal class Program
    {
        // This function has been copied from the ACCC repo, since they call this as well
        // Doesn't really make a difference here that it is called
        private static string Decode(string value)
        {
            return value.Replace("%2F", "/");
        }

        static void Main(string[] args)
        {
            
            string secretIdPermanceKey = "90733A75F19347118B3BE0030AB590A8";
            string stringToDecrypt = "LLYblEfzo/1yQNkqoDn5QQ==";
            string stringToEncryt = "koss.blake";
            string softwareID = "36094666-7e37-4717-8ab0-0c3d3485f56e";

            var encryptionKey = $"{softwareID}{secretIdPermanceKey}";
            Console.WriteLine($"Encrypting: {stringToEncryt}");
            var encryptedBuffer = AesEncryptor.EncryptString(encryptionKey, stringToEncryt);
            Console.WriteLine($"Expected result is: {stringToDecrypt}");
            Console.WriteLine("Actual result is: " + Convert.ToBase64String(encryptedBuffer));
            Console.WriteLine();
            Console.WriteLine($"Decrypting: {stringToDecrypt}");
            string decryptedString = AesEncryptor.DecryptString(encryptionKey, Convert.FromBase64String(stringToDecrypt));
            Console.WriteLine($"Expected result is: {stringToEncryt}");
            Console.WriteLine("Actual result is: " + decryptedString);
        }
    }
}
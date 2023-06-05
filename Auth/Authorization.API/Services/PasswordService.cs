using System.Security.Cryptography;
using System.Text;

namespace Authorization.API.Services
{
    public class PasswordService
    {
        public static void CreateHashedPassword(string password, out string hashedPassword, out string passwordSalt)
        {
            byte[] passwordToBytes = Encoding.UTF8.GetBytes(password);

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = BitConverter.ToString(hmac.Key);
                hashedPassword = BitConverter.ToString(hmac.ComputeHash(passwordToBytes));
            }
        }

        public static bool VerifyHashedPassword(string passwordToCheck, string hashedPassword, string passwordSalt)
        {
            byte[] passwordToBytes = Encoding.UTF8.GetBytes(passwordToCheck);

            string[] passwordSaltToStringArray = passwordSalt.Split('-');
            byte[] passwordSaltToBytes = new byte[passwordSaltToStringArray.Length];

            for (int i = 0; i < passwordSaltToBytes.Length; i++)
            {
                passwordSaltToBytes[i] = Convert.ToByte(passwordSaltToStringArray[i], 16);
            }

            using (var hmac = new HMACSHA512(passwordSaltToBytes))
            {
                var hashedPassToCheck = BitConverter.ToString(hmac.ComputeHash(passwordToBytes));
                return hashedPassToCheck == hashedPassword;
            }
        }
    }
}

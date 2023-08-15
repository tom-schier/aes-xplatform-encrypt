# Run the NETConsole app

go to the NETConsoleApp folder
- run `dotnet build`
- run `dotnet run`

Output is

```
Encrypting: koss.blake
Expected result is: LLYblEfzo/1yQNkqoDn5QQ==
Actual result is: LLYblEfzo/1yQNkqoDn5QQ==

Decrypting: LLYblEfzo/1yQNkqoDn5QQ==
Expected result is: koss.blake
Actual result is: koss.blake`
```

# Run the NodeJS app

go to the NodeJS folder
- run `npm install`
- run `npm run build`
- run `npm start`

Output is

```
Encrypting: koss.blake
Expected result is (should be same as .NET): LLYblEfzo/1yQNkqoDn5QQ==
Actual result is:  eGlqnciFK4seFNvwcHFGPg== 

Decrypting the NodeJS encrypted: eGlqnciFK4seFNvwcHFGPg==
Expected result is: koss.blake
Actual result is:  koss.blake 

Decrypting the NET Core encrypted: LLYblEfzo/1yQNkqoDn5QQ==
Expected result is: koss.blake
Actual result is:  ��/.�K�I�N 
```
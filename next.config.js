/** @type {import('next').NextConfig} */
const nextConfig = {

     images: {
         remotePatterns: [
             {
                 protocol: "https",
                 hostname: "utfs.io"
             }
         ]
     },
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'access',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'password',
        'PATH_API': 'http://localhost:3000/api/',
        'URL': 'http://localhost:3000',
        'OUTLOOK_HOST':'smtp-mail.outlook.com',
        'OUTLOOK_USER':'vsrecepti@outlook.com',
        'OUTLOOK_PASSW': 'Gniv188Ehuy', 
        'GOOGLE_ID': '922033227155-ql5ehrkrfgjvrvtdhhnee29k2tgiqds9.apps.googleusercontent.com',
        'GOOGLE_SECRET': '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',
        'GITHUB_ID': '24c6658778450bfcf6b6',
        'GITHUB_SECRET': '48fea279d4c83e3af5dc034693d2026d8cb116d1',
        'NEXTAUTH_SECRET': 'supersecret',
        'NEXTAUTH_URL': 'http://localhost:3000',
        'UPLOADTHING_SECRET': 'sk_live_014147a72ed47e0b09f8d6d104f2b18fecc497cdb8e056b5fda7fee7cfbac8bf',
        'UPLOADTHING_APP_ID': 'q3osmntofx',
        'SMTP_PORT_TLS': 587,
        'SMTP_PORT_SSL': 465,
    },
}


module.exports = nextConfig

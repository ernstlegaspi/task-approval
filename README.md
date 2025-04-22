Live url: https://task-approval.vercel.app/
Github Repo link: https://github.com/ernstlegaspi/task-approval

# Setup

1. git clone https://github.com/ernstlegaspi/task-approval.git
2. npm install
3. create a .env file in the root directory

# env variables:

DATABASE_URL="postgresql://postgres:zlCxHXZzqGKJzIJEUvECNktNAsQUIDwJ@shortline.proxy.rlwy.net:54824/railway"

AUTH_SECRET="DGfmJrmfwlBEGrDoPvpNv+Il7QvE/l0XUPhVVB8Anys="

EMAIL_USER = put_your_email_here
EMAIL_PASS = put_the_app_password

# generate app password using google

1. Login to your google account
2. Click manage your google account
3. Search for App Passwords
4. Create your app and generate your password

# TECH STACK USED

1. Next.js and Next.js API Routes
2. Postgresql (database)
3. Prisma (ORM)
4. Tailwind CSS (styling)
5. Zustand (state management)
6. Next-auth (authentication)
7. zod (data validation)
8. nodemailer (sending emails)
9. axios (used for HTTP requests)
10. Typescript (typesafety)

# Steps

1. Register as a manager
2. Login as a manager
3. Create task
4. Input title, description, and assigned to (optional at first)
5. Assign a member if null
6. Member can approve or reject the link

# Application Routes

1. /
2. /account

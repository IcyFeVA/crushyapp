# tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    // "strict": false,
    // "noImplicitAny": false,
    // "skipLibCheck": true,
    // "forceConsistentCasingInFileNames": false,
    // "noEmit": true,
    "strict": true,
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

# tailwind.config.js

```js
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: colors.pink,
      accent: colors.indigo,
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.emerald,
      yellow: colors.amber,
      gray: colors.slate,
    },
    // fontFamily: {
    //   'heading': ['HeadingBold', 'system-ui', ...],
    //   'body': ['Bodyregular', 'Georgia', ...],
    // }
  },
  plugins: [],
}


```

# README.md

```md
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   \`\`\`bash
   npm install
   \`\`\`

2. Start the app

   \`\`\`bash
    npx expo start
   \`\`\`

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

\`\`\`bash
npm run reset-project
\`\`\`

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

```

# package.json

```json
{
  "name": "crushy",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "add-fake-users": "node ./scripts/addFakeUsers.js",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "test": "jest --watchAll",
    "lint": "expo lint"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "dependencies": {
    "@expo/config-plugins": "~8.0.0",
    "@expo/metro-config": "~0.18.1",
    "@expo/prebuild-config": "~7.0.0",
    "@expo/vector-icons": "^14.0.0",
    "@gorhom/bottom-sheet": "4",
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-native-community/netinfo": "11.3.1",
    "@react-native-picker/picker": "2.7.5",
    "@react-navigation/bottom-tabs": "^6.6.0",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/native-stack": "^6.9.26",
    "@react-navigation/stack": "^6.4.0",
    "@rneui/themed": "^4.0.0-rc.8",
    "@shopify/flash-list": "^1.6.4",
    "@stream-io/flat-list-mvcp": "^0.10.3",
    "@supabase/supabase-js": "^2.43.4",
    "ai-digest": "^1.0.4",
    "axios": "^1.7.2",
    "base64-js": "^1.5.1",
    "expo": "~51.0.17",
    "expo-av": "^14.0.6",
    "expo-constants": "~16.0.2",
    "expo-dev-client": "~4.0.19",
    "expo-device": "^6.0.2",
    "expo-file-system": "~17.0.1",
    "expo-font": "~12.0.6",
    "expo-haptics": "^13.0.1",
    "expo-image": "~1.12.12",
    "expo-image-manipulator": "~12.0.5",
    "expo-image-picker": "~15.0.7",
    "expo-linking": "~6.3.1",
    "expo-media-library": "~16.0.4",
    "expo-navigation-bar": "~3.0.7",
    "expo-notifications": "^0.28.9",
    "expo-router": "^3.5.18",
    "expo-secure-store": "~13.0.2",
    "expo-splash-screen": "~0.27.5",
    "expo-status-bar": "~1.12.1",
    "expo-system-ui": "~3.0.7",
    "expo-web-browser": "~13.0.3",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.74.3",
    "react-native-appwrite": "^0.4.0",
    "react-native-big-list": "^1.6.1",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-mmkv": "^2.12.2",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "4.10.1",
    "react-native-screens": "3.31.1",
    "react-native-svg": "15.2.0",
    "react-native-toast-message": "^2.2.0",
    "react-native-ui-lib": "^7.23.3",
    "react-native-url-polyfill": "^2.0.0",
    "react-native-web": "~0.19.10",
    "rn-fetch-blob": "^0.12.0",
    "stream-chat": "^8.37.0",
    "stream-chat-expo": "^5.33.1",
    "stream-chat-react-native": "^5.33.1",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@faker-js/faker": "^8.4.1",
    "@types/jest": "^29.5.12",
    "@types/react": "~18.2.45",
    "@types/react-test-renderer": "^18.0.7",
    "jest": "^29.2.1",
    "jest-expo": "~51.0.3",
    "react-test-renderer": "18.2.0",
    "tailwindcss": "^3.3.2",
    "typescript": "~5.3.3"
  },
  "private": true
}

```

# nativewind-env.d.ts

```ts
/// <reference types="nativewind/types" />
```

# expo-env.d.ts

```ts
/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore
```

# eas.json

```json
{
  "cli": {
    "version": ">= 10.0.2"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

# babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel", 'react-native-reanimated/plugin'],
  };
};

```

# app.json

```json
{
  "expo": {
    "name": "Crushy",
    "slug": "crushy",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "crushy",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "ca.crushy.app"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/images/icon.png",
          "color": "#666999",
          "sounds": [
            "./assets/sounds/notification.wav",
          ]
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "$(PRODUCT_NAME) would like access to your photo gallery to share image in a message.",
          "savePhotosPermission": "$(PRODUCT_NAME) would like to save photos to your photo gallery after downloading from a message."
        }
      ],
      [
        "expo-image-picker",
        {
          "cameraPermission": "$(PRODUCT_NAME) would like to use your camera to share image in a message."
        }
      ],
      [
        "expo-av",
        {
          "microphonePermission": "$(PRODUCT_NAME) would like to use your microphone for voice recording."
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "f068ee11-0703-47a6-adf1-55b1eb967272"
      }
    }
  }
}
```

# .gitignore

```
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/

# macOS
.DS_Store

# @generated expo-cli sync-2b81b286409207a5da26e14c78851eb30d8ccbdb
# The following patterns were generated by expo-cli

expo-env.d.ts
config.ts
# @end expo-cli
```

# .easignore

```
node_modules/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/


```

# .aidigestignore

```
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
android/
%ProgramData%/
.vscode/
```

# utils\storage.js

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

// usage:
/*
    import { getData, storeData } from '@/utils/storage';

    storeData('user', session);

    getData('user').then(user => {
        console.log(user);
    });
*/

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving data', e);
    }
};
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (e) {
        console.error('Error reading data', e);
    }
};

const resetUserSearchFilters = async () => {
    const genderPreferencesSet = ['genderPreference', JSON.stringify({ key: '', value: [] })]
    const ageRangeSet = ['ageRange', JSON.stringify({ key: '', value: '18-30' })]
    const distanceSet = ['distance', JSON.stringify({ key: '40', value: '40' })]
    const starSignPreference = ['starSignPreference', JSON.stringify({ key: '', value: '-' })]
    const bodyTypePreference = ['bodyTypePreference', JSON.stringify({ key: '', value: '-' })]
    const exerciseFrequency = ['exerciseFrequency', JSON.stringify({ key: '', value: '-' })]
    const smokingFrequency = ['smokingFrequency', JSON.stringify({ key: '', value: '-' })]
    const drinkingFrequency = ['drinkingFrequency', JSON.stringify({ key: '', value: '-' })]
    const cannabisFrequency = ['cannabisFrequency', JSON.stringify({ key: '', value: '-' })]
    const dietPreference = ['dietPreference', JSON.stringify({ key: '', value: '-' })]

    try {
        await AsyncStorage.multiSet([genderPreferencesSet, ageRangeSet, distanceSet, starSignPreference, bodyTypePreference,
            exerciseFrequency, smokingFrequency, drinkingFrequency, cannabisFrequency, dietPreference])
    } catch (e) {
        //save error
    }

    console.log("search filters reset")
}


const clearAllStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('CLEARING STORAGE')
}

export { storeData, getData, resetUserSearchFilters, clearAllStorage };
```

# utils\pixelateImage.js

```js
import * as ImageManipulator from 'expo-image-manipulator';

async function pixelateImage(uri, pixelSize = 20) {
    // Resize the image to a smaller size
    const smallImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 100 } }],
        { format: 'png' }
    );

    // Resize it back to original size, creating pixelation effect
    const pixelatedImage = await ImageManipulator.manipulateAsync(
        smallImage.uri,
        [{ resize: { width: 300 } }],
        { format: 'png' }
    );

    return pixelatedImage.uri;
}
```

# supabase\seed.sql

```sql

```

# supabase\config.toml

```toml
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "crushyapp"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. `public` is always included.
schemas = ["public", "graphql_public"]
# Extra schemas to add to the search_path of every request. `public` is always included.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 15

[db.pooler]
enabled = false
# Port to use for the local connection pooler.
port = 54329
# Specifies when a server connection can be reused by other clients.
# Configure one of the supported pooler modes: `transaction`, `session`.
pool_mode = "transaction"
# How many server connections to allow per user/database pair.
default_pool_size = 20
# Maximum number of client connections allowed.
max_client_conn = 100

[realtime]
enabled = true
# Bind realtime via either IPv4 or IPv6. (default: IPv4)
# ip_version = "IPv6"
# The maximum length in bytes of HTTP request headers. (default: 4096)
# max_header_length = 4096

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1"
# OpenAI API Key to use for Supabase AI in the Supabase Studio.
openai_api_key = "env(OPENAI_API_KEY)"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

[storage.image_transformation]
enabled = true

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://127.0.0.1:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://127.0.0.1:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 (1 week).
jwt_expiry = 3600
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true
# Allow/disallow anonymous sign-ins to your project.
enable_anonymous_sign_ins = false
# Allow/disallow testing manual linking of accounts
enable_manual_linking = false

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false
# Controls the minimum amount of time that must pass before sending another signup confirmation or password reset email.
max_frequency = "1s"

# Use a production-ready SMTP server
# [auth.email.smtp]
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = true
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending OTP to users
template = "Your code is {{ .Code }} ."
# Controls the minimum amount of time that must pass before sending another sms otp.
max_frequency = "5s"

# Use pre-defined map of phone number to OTP for testing.
# [auth.sms.test_otp]
# 4152127777 = "123456"

# Configure logged in session timeouts.
# [auth.sessions]
# Force log out after the specified duration.
# timebox = "24h"
# Force log out if the user has been inactive longer than the specified duration.
# inactivity_timeout = "8h"

# This hook runs before a token is issued and allows you to add additional claims based on the authentication method used.
# [auth.hook.custom_access_token]
# enabled = true
# uri = "pg-functions://<database>/<schema>/<hook_name>"

# Configure one of the supported SMS providers: `twilio`, `twilio_verify`, `messagebird`, `textlocal`, `vonage`.
[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin_oidc`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
# DO NOT commit your OAuth provider secret to git. Use environment variable substitution instead:
secret = "env(SUPABASE_AUTH_EXTERNAL_APPLE_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
# If enabled, the nonce check will be skipped. Required for local sign in with Google auth.
skip_nonce_check = false

[edge_runtime]
enabled = true
# Configure one of the supported request policies: `oneshot`, `per_worker`.
# Use `oneshot` for hot reload, or `per_worker` for load testing.
policy = "oneshot"
inspector_port = 8083

[analytics]
enabled = false
port = 54327
vector_port = 54328
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

# Experimental features may be deprecated any time
[experimental]
# Configures Postgres storage engine to use OrioleDB (S3)
orioledb_version = ""
# Configures S3 bucket URL, eg. <bucket_name>.s3-<region>.amazonaws.com
s3_host = "env(S3_HOST)"
# Configures S3 bucket region, eg. us-east-1
s3_region = "env(S3_REGION)"
# Configures AWS_ACCESS_KEY_ID for S3 bucket
s3_access_key = "env(S3_ACCESS_KEY)"
# Configures AWS_SECRET_ACCESS_KEY for S3 bucket
s3_secret_key = "env(S3_SECRET_KEY)"

```

# supabase\.gitignore

```
# Supabase
.branches
.temp
.env

```

# sql\profile_details.sql

```sql
CREATE TABLE profile_details (
  id UUID PRIMARY KEY REFERENCES profiles_test(id),
  bio TEXT,
  height_cm INTEGER,
  body_type SMALLINT,
  exercise_frequency SMALLINT,
  smoking_status SMALLINT,
  drinking_status SMALLINT,
  cannabis_use SMALLINT,
  diet_preference SMALLINT,
  education_level SMALLINT,
  occupation TEXT,
  relationship_status SMALLINT,
  relationship_type SMALLINT, -- e.g., monogamous, non-monogamous, polyamorous
  children SMALLINT, -- e.g., have and want more, have and don't want more, don't have and want, don't have and don't want
  pets SMALLINT[], -- array of pets owned
  languages SMALLINT[], -- array of languages spoken
  religion SMALLINT,
  political_views SMALLINT,
  zodiac_sign SMALLINT,
  personality_type SMALLINT, -- e.g., MBTI, Enneagram, etc.
  love_language SMALLINT[], -- array of love languages
  communication_style SMALLINT,
  conflict_resolution_style SMALLINT,
  living_situation SMALLINT, -- e.g., own, rent, with roommates, with family
  hometown TEXT,
  willing_to_relocate BOOLEAN,
  travel_frequency SMALLINT,
  hobbies TEXT[], -- array of hobbies not covered by the main interests
  favorite_music_genres TEXT[],
  favorite_movies_tv TEXT[],
  favorite_books TEXT[],
  social_media_activity SMALLINT,
  ideal_first_date TEXT,
  deal_breakers TEXT[],
  love_story TEXT, -- a field for users to describe their ideal love story or relationship
  values TEXT[], -- array of personal values
  kink_friendly BOOLEAN,
  openness_to_experimentation TEXT,
  intimacy_preferences TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- First, create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Now, create the trigger that uses this function
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON profile_details
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

# scripts\reset-project.js

```js
#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app directory to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldDirPath = path.join(root, 'app');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'app');

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.rename(oldDirPath, newDirPath, (error) => {
  if (error) {
    return console.error(`Error renaming directory: ${error}`);
  }
  console.log('/app moved to /app-example.');

  fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
    if (error) {
      return console.error(`Error creating new app directory: ${error}`);
    }
    console.log('New /app directory created.');

    const indexPath = path.join(newAppDirPath, 'index.tsx');
    fs.writeFile(indexPath, indexContent, (error) => {
      if (error) {
        return console.error(`Error creating index.tsx: ${error}`);
      }
      console.log('app/index.tsx created.');

      const layoutPath = path.join(newAppDirPath, '_layout.tsx');
      fs.writeFile(layoutPath, layoutContent, (error) => {
        if (error) {
          return console.error(`Error creating _layout.tsx: ${error}`);
        }
        console.log('app/_layout.tsx created.');
      });
    });
  });
});

```

# scripts\addFakeUsers.js

```js
const { createClient } = require('@supabase/supabase-js');
const { faker } = require('@faker-js/faker');

// Initialize Supabase client

const supabaseUrl = "https://mmarjzhissgpyfwxudqd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tYXJqemhpc3NncHlmd3h1ZHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0Mzg2MTUsImV4cCI6MjAzMzAxNDYxNX0.9GLFl6ZosXtNoL61uFx3L1nUc5ENRSWRnhS-LTDb6SA"

const supabase = createClient(supabaseUrl, supabaseKey);

const genders = [1, 2, 3, 4, 5, 6];
const pronouns = [1, 2, 3, 4, 5];
const relationshipTypes = [1, 2, 3];
const gender_preferences = [1, 2, 3];
const interests = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

async function createFakeUser() {
    const gender = faker.helpers.arrayElement(genders);
    const user = {
        id: faker.string.uuid(),
        name: faker.internet.displayName(),
        age: faker.number.int({ min: 18, max: 80 }),
        gender: gender,
        pronouns: faker.helpers.arrayElements(pronouns, { min: 1, max: 2 }),
        looking_for: faker.helpers.arrayElement(relationshipTypes),
        gender_preference: faker.helpers.arrayElement(gender_preferences),
        interests: faker.helpers.arrayElements(interests, { min: 3, max: 8 }),
        avatar_url: faker.image.url(),
        last_active: faker.date.recent(),
    };

    const { data, error } = await supabase
        .from('profiles_test')
        .insert(user);

    if (error) {
        console.error('Error inserting user:', error);
    } else {
        console.log('User created:', user.name);
    }
}

async function createFakeUsers(count) {
    for (let i = 0; i < count; i++) {
        await createFakeUser();
    }
    console.log(`${count} fake users created.`);
}

// Create 100 fake users
createFakeUsers(400).then(() => process.exit());
```

# providers\AppProvider.tsx

```tsx
import React, { createContext, useContext, useState } from 'react';

interface FilterPreference {
  key: string;
  value: string | string[];
}

interface SearchFilters {
  genderPreference: FilterPreference;
  ageRange: {
    min: number;
    max: number;
  };
  distance: FilterPreference;
  starSignPreference: FilterPreference;
  bodyTypePreference: FilterPreference;
  exerciseFrequency: FilterPreference;
  smokingFrequency: FilterPreference;
  drinkingFrequency: FilterPreference;
  cannabisFrequency: FilterPreference;
  dietPreference: FilterPreference;
}



interface AppContextType {
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;

  showOnboarding: boolean;
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSearchFilters: SearchFilters = {
  genderPreference: { key: '', value: [] },
  ageRange: { min: 18, max: 35 },
  distance: { key: '', value: '' },
  starSignPreference: { key: '', value: '' },
  bodyTypePreference: { key: '', value: '' },
  exerciseFrequency: { key: '', value: '' },
  smokingFrequency: { key: '', value: '' },
  drinkingFrequency: { key: '', value: '' },
  cannabisFrequency: { key: '', value: '' },
  dietPreference: { key: '', value: '' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchFilters);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetFilters = () => {
    console.log('Resetting filters');
    setSearchFilters(defaultSearchFilters);
  };

  return (
    <AppContext.Provider value={{
      searchFilters,
      setSearchFilters,
      resetFilters,
      showOnboarding,
      setShowOnboarding,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
```

# lib\supabase.ts

```ts
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mmarjzhissgpyfwxudqd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tYXJqemhpc3NncHlmd3h1ZHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0Mzg2MTUsImV4cCI6MjAzMzAxNDYxNX0.9GLFl6ZosXtNoL61uFx3L1nUc5ENRSWRnhS-LTDb6SA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
```

# lib\streamChat.ts

```ts
// lib/streamChat.ts

import { fetchStreamToken } from '@/api/auth';
import { StreamChat } from 'stream-chat';

export const chatClient = StreamChat.getInstance('pcvjbntz7tfy');







export const connectUser = async (user: { id: string; }) => {
  try {
    await chatClient.connectUser(
      user, 
      async () => {
        return await fetchStreamToken(user.id)
      }
    );
    console.log('User connected successfully');
  } catch (error) {
    console.error('Error connecting user to Stream:', error);
    throw error;
  }
};

export const disconnectUser = async () => {
  try {
    await chatClient.disconnectUser();
    console.log('User disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting user from Stream:', error);
  }
};

export const createChannel = async (channelId: string, members: string[]) => {
  try {
    const channel = chatClient.channel('messaging', {
      members,
    });
    await channel.create();
    return channel;
  } catch (error) {
    console.error('Error creating channel:', error);
    throw error;
  }
};
```

# lang\profile_details.js

```js
// Profile field mappings

export const profileFieldMappings = {
    body_type: [
        { key: 1, en: 'Slim', es: 'Delgado' },
        { key: 2, en: 'Athletic', es: 'Atlético' },
        { key: 3, en: 'Average', es: 'Promedio' },
        { key: 4, en: 'Curvy', es: 'Curvilíneo' },
        { key: 5, en: 'Plus-sized', es: 'Talla grande' }
    ],

    exercise_frequency: [
        { key: 1, en: 'Never', es: 'Nunca' },
        { key: 2, en: 'Rarely', es: 'Raramente' },
        { key: 3, en: 'Sometimes', es: 'A veces' },
        { key: 4, en: 'Often', es: 'Frecuentemente' },
        { key: 5, en: 'Every day', es: 'Todos los días' }
    ],

    smoking_status: [
        { key: 1, en: 'Never', es: 'Nunca' },
        { key: 2, en: 'Occasionally', es: 'Ocasionalmente' },
        { key: 3, en: 'Socially', es: 'Socialmente' },
        { key: 4, en: 'Regularly', es: 'Regularmente' },
        { key: 5, en: 'Trying to quit', es: 'Tratando de dejarlo' }
    ],

    drinking_status: [
        { key: 1, en: 'Never', es: 'Nunca' },
        { key: 2, en: 'Rarely', es: 'Raramente' },
        { key: 3, en: 'Socially', es: 'Socialmente' },
        { key: 4, en: 'Regularly', es: 'Regularmente' },
        { key: 5, en: 'Frequently', es: 'Frecuentemente' }
    ],

    cannabis_use: [
        { key: 1, en: 'Never', es: 'Nunca' },
        { key: 2, en: 'Occasionally', es: 'Ocasionalmente' },
        { key: 3, en: 'Socially', es: 'Socialmente' },
        { key: 4, en: 'Regularly', es: 'Regularmente' },
        { key: 5, en: 'Medicinally', es: 'Medicinalmente' }
    ],

    diet_preference: [
        { key: 1, en: 'No preference', es: 'Sin preferencia' },
        { key: 2, en: 'Vegetarian', es: 'Vegetariano' },
        { key: 3, en: 'Vegan', es: 'Vegano' },
        { key: 4, en: 'Pescatarian', es: 'Pescetariano' },
        { key: 5, en: 'Keto', es: 'Keto' },
        { key: 6, en: 'Paleo', es: 'Paleo' }
    ],

    education_level: [
        { key: 1, en: 'High school', es: 'Secundaria' },
        { key: 2, en: 'Some college', es: 'Algo de universidad' },
        { key: 3, en: "Bachelor's degree", es: 'Licenciatura' },
        { key: 4, en: "Master's degree", es: 'Maestría' },
        { key: 5, en: 'Doctorate', es: 'Doctorado' },
        { key: 6, en: 'Trade school', es: 'Escuela técnica' }
    ],

    relationship_status: [
        { key: 1, en: 'Single', es: 'Soltero/a' },
        { key: 2, en: 'Divorced', es: 'Divorciado/a' },
        { key: 3, en: 'Widowed', es: 'Viudo/a' },
        { key: 4, en: 'Separated', es: 'Separado/a' },
        { key: 5, en: 'In a relationship', es: 'En una relación' },
        { key: 6, en: 'It\'s complicated', es: 'Es complicado' }
    ],

    relationship_type: [
        { key: 1, en: 'Monogamous', es: 'Monógamo' },
        { key: 2, en: 'Non-monogamous', es: 'No monógamo' },
        { key: 3, en: 'Polyamorous', es: 'Poliamoroso' },
        { key: 4, en: 'Open to different types', es: 'Abierto a diferentes tipos' }
    ],

    looking_for: [
        { key: 1, en: 'Friendship', es: 'Amistad' },
        { key: 2, en: 'Casual dating', es: 'Citas casuales' },
        { key: 3, en: 'Long-term relationship', es: 'Relación a largo plazo' },
        { key: 4, en: 'Marriage', es: 'Matrimonio' },
        { key: 5, en: 'Not sure yet', es: 'No estoy seguro aún' }
    ],

    children: [
        { key: 1, en: 'Have and want more', es: 'Tengo y quiero más' },
        { key: 2, en: 'Have and don\'t want more', es: 'Tengo y no quiero más' },
        { key: 3, en: 'Don\'t have and want', es: 'No tengo y quiero' },
        { key: 4, en: 'Don\'t have and don\'t want', es: 'No tengo y no quiero' },
        { key: 5, en: 'Not sure', es: 'No estoy seguro/a' }
    ],

    zodiac_sign: [
        { key: 1, en: 'Aries', es: 'Aries' },
        { key: 2, en: 'Taurus', es: 'Tauro' },
        { key: 3, en: 'Gemini', es: 'Géminis' },
        { key: 4, en: 'Cancer', es: 'Cáncer' },
        { key: 5, en: 'Leo', es: 'Leo' },
        { key: 6, en: 'Virgo', es: 'Virgo' },
        { key: 7, en: 'Libra', es: 'Libra' },
        { key: 8, en: 'Scorpio', es: 'Escorpio' },
        { key: 9, en: 'Sagittarius', es: 'Sagitario' },
        { key: 10, en: 'Capricorn', es: 'Capricornio' },
        { key: 11, en: 'Aquarius', es: 'Acuario' },
        { key: 12, en: 'Pisces', es: 'Piscis' }
    ],

    personality_type: [
        { key: 1, en: 'INTJ', es: 'INTJ' },
        { key: 2, en: 'INTP', es: 'INTP' },
        { key: 3, en: 'ENTJ', es: 'ENTJ' },
        { key: 4, en: 'ENTP', es: 'ENTP' },
        { key: 5, en: 'INFJ', es: 'INFJ' },
        { key: 6, en: 'INFP', es: 'INFP' },
        { key: 7, en: 'ENFJ', es: 'ENFJ' },
        { key: 8, en: 'ENFP', es: 'ENFP' },
        { key: 9, en: 'ISTJ', es: 'ISTJ' },
        { key: 10, en: 'ISFJ', es: 'ISFJ' },
        { key: 11, en: 'ESTJ', es: 'ESTJ' },
        { key: 12, en: 'ESFJ', es: 'ESFJ' },
        { key: 13, en: 'ISTP', es: 'ISTP' },
        { key: 14, en: 'ISFP', es: 'ISFP' },
        { key: 15, en: 'ESTP', es: 'ESTP' },
        { key: 16, en: 'ESFP', es: 'ESFP' }
    ],

    love_languages: [
        { key: 1, en: 'Words of Affirmation', es: 'Palabras de afirmación' },
        { key: 2, en: 'Acts of Service', es: 'Actos de servicio' },
        { key: 3, en: 'Receiving Gifts', es: 'Recibir regalos' },
        { key: 4, en: 'Quality Time', es: 'Tiempo de calidad' },
        { key: 5, en: 'Physical Touch', es: 'Contacto físico' }
    ],

    communication_style: [
        { key: 1, en: 'Direct', es: 'Directo' },
        { key: 2, en: 'Indirect', es: 'Indirecto' },
        { key: 3, en: 'Passive', es: 'Pasivo' },
        { key: 4, en: 'Aggressive', es: 'Agresivo' },
        { key: 5, en: 'Passive-Aggressive', es: 'Pasivo-agresivo' }
    ],

    conflict_resolution_style: [
        { key: 1, en: 'Competing', es: 'Competitivo' },
        { key: 2, en: 'Collaborating', es: 'Colaborativo' },
        { key: 3, en: 'Compromising', es: 'Comprometido' },
        { key: 4, en: 'Accommodating', es: 'Acomodaticio' },
        { key: 5, en: 'Avoiding', es: 'Evitativo' }
    ],

    income_range: [
        { key: 1, en: 'Prefer not to say', es: 'Prefiero no decir' },
        { key: 2, en: 'Under $25,000', es: 'Menos de $25,000' },
        { key: 3, en: '$25,000 - $50,000', es: '$25,000 - $50,000' },
        { key: 4, en: '$50,000 - $75,000', es: '$50,000 - $75,000' },
        { key: 5, en: '$75,000 - $100,000', es: '$75,000 - $100,000' },
        { key: 6, en: 'Over $100,000', es: 'Más de $100,000' }
    ],

    living_situation: [
        { key: 1, en: 'Own', es: 'Propio' },
        { key: 2, en: 'Rent', es: 'Alquiler' },
        { key: 3, en: 'With roommates', es: 'Con compañeros de piso' },
        { key: 4, en: 'With family', es: 'Con familia' },
        { key: 5, en: 'Other', es: 'Otro' }
    ],

    travel_frequency: [
        { key: 1, en: 'Rarely', es: 'Raramente' },
        { key: 2, en: 'Once a year', es: 'Una vez al año' },
        { key: 3, en: 'A few times a year', es: 'Algunas veces al año' },
        { key: 4, en: 'Monthly', es: 'Mensualmente' },
        { key: 5, en: 'Frequently', es: 'Frecuentemente' }
    ],

    social_media_activity: [
        { key: 1, en: 'Very active', es: 'Muy activo' },
        { key: 2, en: 'Active', es: 'Activo' },
        { key: 3, en: 'Moderate', es: 'Moderado' },
        { key: 4, en: 'Minimal', es: 'Mínimo' },
        { key: 5, en: 'No social media', es: 'Sin redes sociales' }
    ],

    openness_to_experimentation: [
        { key: 1, en: 'Very open', es: 'Muy abierto' },
        { key: 2, en: 'Open', es: 'Abierto' },
        { key: 3, en: 'Somewhat open', es: 'Algo abierto' },
        { key: 4, en: 'Not very open', es: 'No muy abierto' },
        { key: 5, en: 'Closed', es: 'Cerrado' }
    ]
};





// Helper function to get the label for a given field and key
export const getFieldLabel = (field, key, language = 'en') => {
    const fieldData = profileFieldMappings[field];
    if (!fieldData) return null;

    const item = fieldData.find(item => item.key === key);
    return item ? item[language] : null;
};

// Helper function to get all options for a field
export const getFieldOptions = (field, language = 'en') => {
    const fieldData = profileFieldMappings[field];
    if (!fieldData) return [];

    return fieldData.map(item => ({
        key: item.key,
        label: item[language]
    }));
}; 
```

# hooks\useWarmUpBrowser.ts

```ts
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};
```

# hooks\useThemeColor.ts

```ts
/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

```

# hooks\useProfile.ts

```ts
// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';

export const useProfile = (session: Session | null) => {
    const [onboardingDone, setOnboardingDone] = useState<boolean>(false);

    useEffect(() => {
        if (session) {
            const getProfile = async () => {
                try {
                    const { data } = await supabase
                        .from('profiles_test')
                        .select('name')
                        .eq('id', session?.user.id)
                        .single();

                        if(data) {
                            console.log('database data received', data)
                            setOnboardingDone(data?.name != null);
                        }
                    
                } catch (error: any) { 
                    Alert.alert(error.message);
                }
            };

            getProfile();
        }
    }, [session]);

    return onboardingDone;
};

```

# hooks\useNotifications.ts

```ts
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [matchNotifications, setMatchNotifications] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();
    const session = useAuth();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        let subscription;

        const setupMatchNotifications = async () => {
            if (session?.user.id) {
                // Initial fetch of unread notifications
                const { data, error } = await supabase
                    .rpc('get_unread_match_notifications', { user_id: session.user.id });

                if (data) {
                    setMatchNotifications(data);
                    console.log('Initial match notifications:', data);
                }

                // Set up realtime subscription
                subscription = supabase
                    .channel('match_notifications')
                    .on(
                        'postgres_changes',
                        {
                            event: 'INSERT',
                            schema: 'public',
                            table: 'match_notifications',
                            filter: `user_id=eq.${session.user.id}`,
                        },
                        (payload) => {
                            console.log('New match notification:', payload);
                            setMatchNotifications(prevNotifications => [...prevNotifications, payload.new]);
                        }
                    )
                    .subscribe();
            }
        };

        setupMatchNotifications();

        // Cleanup function
        return () => {
            if (subscription) {
                supabase.removeChannel(subscription);
            }
        };
    }, [session?.user.id]);

    return { expoPushToken, notification, matchNotifications };
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    } else {
        console.log('Must use physical device for Push Notifications');
    }
    console.log('token', token)
    // Store the token in Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { error } = await supabase
            .from('profiles_test')
            .update({ push_token: token })
            .eq('id', user.id);

        if (error) {
            console.error('Error storing push token:', error);
        }
    }

    return token;
}
```

# hooks\useColorScheme.web.ts

```ts
// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native
// but can be achieved using a styling library like Nativewind.
export function useColorScheme() {
  return 'light';
}

```

# hooks\useColorScheme.ts

```ts
export { useColorScheme } from 'react-native';

```

# hooks\useAuth.ts

```ts
// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { fetchStreamToken } from '@/api/auth';

export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
          setSession(session); // Set session without Stream token
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
          setSession(session); // Set session without Stream token
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
};
```

# hooks\useApi.ts

```ts
import { useState, useCallback } from 'react';
import { api } from '@/api/supabaseApi';
import { useAuth } from '@/hooks/useAuth';

export const useProfile = () => {
  const session = useAuth();
  const [profileDetails, setProfileDetails] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentUserProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
        const data = await api.getCurrentUserProfile(session.user.id);
        console.log('Fetched Current User Profile:', data);
        setCurrentUserProfile(data);
    } catch (err) {
        console.error('Error fetching current user profile:', err);
        setError(err);
    } finally {
        setLoading(false);
    }
}, [session]);

const fetchProfileDetails = useCallback(async (userId: string) => {
    if (!userId) return null;
    try {
        const data = await api.getProfileDetails(userId);
        console.log('Fetched Profile Details:', data);
        return data;
    } catch (err) {
        console.error('Error fetching profile details:', err);
        setError(err);
        return null;
    }
}, []);

  return { profileDetails, loading, error, fetchProfileDetails, fetchCurrentUserProfile, currentUserProfile };
};

export const usePotentialMatches = () => {
  const session = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = useCallback(async (limit = 10) => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const data = await api.getPotentialMatches(session.user.id, limit);
      setMatches(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [session]);



  const fetchDiveMatches = useCallback(async (limit = 10) => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
        const data = await api.getPotentialDiveMatches(session.user.id, limit);
        console.log('Fetched Dive Matches:', data);
        setMatches(data);
    } catch (err) {
        console.error('Error fetching dive matches:', err);
        setError(err);
    } finally {
        setLoading(false);
    }
}, [session]);

  const recordAction = useCallback(async (matchedUserId: string, action: 'like' | 'dislike') => {
    if (!session?.user?.id) return;
    try {
      await api.recordMatchAction(session.user.id, matchedUserId, action);
    } catch (err) {
      setError(err);
    }
  }, [session]);

  return { matches, loading, error, fetchMatches, fetchDiveMatches, recordAction };
};


```

# constants\ToastConfig.ts

```ts
import React from "react"
import { View, Text } from "react-native-ui-lib"
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


export const toastConfig = {

    success: (props) => (
        <BaseToast
            { ...props }
            style={{ borderLeftColor: 'pink' }}
contentContainerStyle = {{ paddingHorizontal: 15 }}
text1Style = {{
    fontSize: 15,
        fontWeight: '400'
}}
/>
    ),

error: (props) => (
    <ErrorToast
            { ...props }
            text1Style = {{ fontSize: 17 }}
text2Style = {{ fontSize: 15 }}
/>
    ),
    /*
      Or create a completely new type - `default`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    default: ({ text1, text2, props }) => (
    <View style= {{ display: 'flex', justifyContent: 'center', width: '94%', backgroundColor: Colors.light.accent, borderRadius: 8, padding: 16 }}>
        <Text style={ { fontFamily: 'HeadingBold', color: 'white' } }> { text1 } < /Text>
            < Text style = {{ fontFamily: 'BodyRegular', color: 'white' }}> { text2 } < /Text>
{/* <Text>{props.uuid}</Text> */ }
</View>
    )
};
```

# constants\Styles.ts

```ts
import { Colors } from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
    },
    body: {
        fontFamily: 'BodyRegular',
        color: Colors.light.text,
        fontSize: 16,
        lineHeight: 24
    },
    bodyBold: {
        fontFamily: 'BodyBold',
        color: Colors.light.text,
        fontSize: 16,
        lineHeight: 24
    },
    buttonShadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#ccc",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    h2: {
        fontSize: 24,
        fontFamily: 'HeadingBold',
        color: Colors.light.text
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    button: {
        display: 'flex',
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.light.primaryLight,
        paddingTop: 6,
        paddingHorizontal: 32,
        borderRadius: 8,
        minHeight: 48,
    },
    buttonLabel: {
        fontSize: 14,
        fontFamily: 'BodyBold',
        color: Colors.light.textInverted,
        textTransform: 'uppercase'
    },
    buttonSecondary: {
        display: 'flex',
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        paddingTop: 6,
        paddingHorizontal: 32,
        borderRadius: 8,
        minHeight: 48,
    },
    buttonSecondaryLabel: {
        fontSize: 14,
        fontFamily: 'BodyBold',
        color: Colors.light.primary,
        textTransform: 'uppercase'
    },
    settingListButton: {
        display: 'flex',
        backgroundColor: Colors.light.background,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        height: 64,
        maxHeight: 64,
        borderTopWidth: 0,
    },
    settingListButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    radioButton: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        height: 64,
    },
    radioButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    checkboxButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        height: 64,
        backgroundColor: Colors.light.background,
    },
    checkboxButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    noRadius: {
        borderRadius: 0
    },
});
```

# constants\Interests.ts

```ts
const hobbiesInterests = [
    [
        { value: "1", label: "Hiking" },
        { value: "2", label: "Camping" },
        { value: "3", label: "Fishing" },
        { value: "4", label: "Hunting" },
        { value: "5", label: "Rock Climbing" },
        { value: "6", label: "Bird Watching" },
        { value: "7", label: "Kayaking" },
        { value: "8", label: "Canoeing" },
        { value: "9", label: "Surfing" },
        { value: "10", label: "Snowboarding" },
        { value: "11", label: "Skiing" },
        { value: "12", label: "Mountain Biking" },
        { value: "13", label: "Road Biking" },
        { value: "14", label: "Running" },
        { value: "15", label: "Jogging" },
        { value: "16", label: "Trail Running" },
        { value: "17", label: "Paddleboarding" },
        { value: "18", label: "Sailing" },
        { value: "19", label: "Horseback Riding" },
        { value: "20", label: "Gardening" },
        { value: "21", label: "Stargazing" },
        { value: "22", label: "Geocaching" },
        { value: "23", label: "Off-roading" },
        { value: "24", label: "Archery" },
        { value: "25", label: "Skateboarding" },
    ],
    [
        { value: "26", label: "Basketball" },
        { value: "27", label: "Football (American)" },
        { value: "28", label: "Soccer" },
        { value: "29", label: "Baseball" },
        { value: "30", label: "Softball" },
        { value: "31", label: "Volleyball" },
        { value: "32", label: "Tennis" },
        { value: "33", label: "Badminton" },
        { value: "34", label: "Golf" },
        { value: "35", label: "Swimming" },
        { value: "36", label: "Martial Arts" },
        { value: "37", label: "Yoga" },
        { value: "38", label: "Pilates" },
        { value: "39", label: "CrossFit" },
        { value: "40", label: "Weightlifting" },
        { value: "41", label: "Boxing" },
        { value: "42", label: "Wrestling" },
        { value: "43", label: "Cheerleading" },
        { value: "44", label: "Gymnastics" },
        { value: "45", label: "Dance" },
        { value: "46", label: "Ice Hockey" },
        { value: "47", label: "Lacrosse" },
        { value: "48", label: "Cricket" },
        { value: "49", label: "Ultimate Frisbee" },
        { value: "50", label: "Rugby" },
    ],
    [
        { value: "51", label: "Painting" },
        { value: "52", label: "Drawing" },
        { value: "53", label: "Sketching" },
        { value: "54", label: "Sculpting" },
        { value: "55", label: "Pottery" },
        { value: "56", label: "Knitting" },
        { value: "57", label: "Crocheting" },
        { value: "58", label: "Sewing" },
        { value: "59", label: "Quilting" },
        { value: "60", label: "Embroidery" },
        { value: "61", label: "Woodworking" },
        { value: "62", label: "Metalworking" },
        { value: "63", label: "Calligraphy" },
        { value: "64", label: "Photography" },
        { value: "65", label: "Videography" },
        { value: "66", label: "Filmmaking" },
        { value: "67", label: "Acting" },
        { value: "68", label: "Singing" },
        { value: "69", label: "Songwriting" },
        { value: "70", label: "Playing Musical Instruments (Guitar, Piano, Drums, etc.)" },
        { value: "71", label: "Dancing (Ballet, Hip Hop, Salsa, etc.)" },
        { value: "72", label: "Crafting" },
        { value: "73", label: "Jewelry Making" },
        { value: "74", label: "Writing (Poetry, Novels, etc.)" },
        { value: "75", label: "Journaling" },
    ],
    [
        { value: "76", label: "Reading" },
        { value: "77", label: "Watching Movies" },
        { value: "78", label: "Binge-watching" },
        { value: "79", label: "Theater" },
        { value: "80", label: "Opera" },
        { value: "81", label: "Stand-up Comedy" },
        { value: "82", label: "Attending Concerts" },
        { value: "83", label: "Music Festivals" },
        { value: "84", label: "Podcasts" },
        { value: "85", label: "Gaming (Video Games, Board Games, Card Games, etc.)" },
        { value: "86", label: "Puzzle Solving (Crosswords, Sudoku, etc.)" },
        { value: "87", label: "Trivia" },
        { value: "88", label: "Watching Sports" },
        { value: "89", label: "Cosplaying" },
        { value: "90", label: "Collecting (Stamps, Coins, Comics, etc.)" },
        { value: "91", label: "Magic Tricks" },
    ],
    [
        { value: "92", label: "Cooking" },
        { value: "93", label: "Baking" },
        { value: "94", label: "Grilling/BBQ" },
        { value: "95", label: "Mixology" },
        { value: "96", label: "Wine Tasting" },
        { value: "97", label: "Beer Brewing" },
        { value: "98", label: "Coffee Tasting" },
        { value: "99", label: "Tea Tasting" },
        { value: "100", label: "Food Blogging" },
        { value: "101", label: "Trying New Restaurants" },
        { value: "102", label: "Vegetarian/Vegan Cooking" },
    ],
    [
        { value: "103", label: "Traveling" },
        { value: "104", label: "Road Trips" },
        { value: "105", label: "Exploring New Cities" },
        { value: "106", label: "Visiting Museums" },
        { value: "107", label: "Visiting Art Galleries" },
        { value: "108", label: "Attending Festivals" },
        { value: "109", label: "Volunteering" },
        { value: "110", label: "Charity Work" },
        { value: "111", label: "Social Clubs" },
        { value: "112", label: "Book Clubs" },
        { value: "113", label: "Networking Events" },
        { value: "114", label: "Public Speaking" },
        { value: "115", label: "Debate" },
        { value: "116", label: "Language Learning" },
        { value: "117", label: "Cultural Events" },
    ],
    [
        { value: "118", label: "Coding" },
        { value: "119", label: "Robotics" },
        { value: "120", label: "3D Printing" },
        { value: "121", label: "Virtual Reality" },
        { value: "122", label: "Augmented Reality" },
        { value: "123", label: "Building Computers" },
        { value: "124", label: "Electronics" },
        { value: "125", label: "Astronomy" },
        { value: "126", label: "Science Experiments" },
        { value: "127", label: "Drone Flying" },
    ],
    [
        { value: "128", label: "Chess" },
        { value: "129", label: "Strategy Games" },
        { value: "130", label: "Philosophy" },
        { value: "131", label: "History" },
        { value: "132", label: "Archaeology" },
        { value: "133", label: "Anthropology" },
        { value: "134", label: "Psychology" },
        { value: "135", label: "Economics" },
        { value: "136", label: "Politics" },
        { value: "137", label: "Debate" },
        { value: "138", label: "Mathematics" },
        { value: "139", label: "Cryptography" },
        { value: "140", label: "Puzzles" },
    ],
    [
        { value: "141", label: "Bird Watching" },
        { value: "142", label: "Wildlife Photography" },
        { value: "143", label: "Beekeeping" },
        { value: "144", label: "Dog Training" },
        { value: "145", label: "Cat Care" },
        { value: "146", label: "Reptile Keeping" },
        { value: "147", label: "Fish Keeping" },
        { value: "148", label: "Animal Rescue" },
        { value: "149", label: "Farming" },
        { value: "150", label: "Permaculture" },
    ],
    [
        { value: "151", label: "Collecting Antiques" },
        { value: "152", label: "Miniatures" },
        { value: "153", label: "Model Building" },
        { value: "154", label: "Trainspotting" },
        { value: "155", label: "Urban Exploration" },
        { value: "156", label: "Home Improvement" },
        { value: "157", label: "Interior Design" },
        { value: "158", label: "Feng Shui" },
        { value: "159", label: "Meditation" },
        { value: "160", label: "Astrology" },
        { value: "161", label: "Tarot Reading" },
        { value: "162", label: "Numerology" },
        { value: "163", label: "Genealogy" },
        { value: "164", label: "Thrill Seeking" },
        { value: "165", label: "Fandom Activities (Sci-Fi, Fantasy, etc.)" },
        { value: "166", label: "Vlogging" },
        { value: "167", label: "Blogging" },
        { value: "168", label: "Sustainable Living" },
        { value: "169", label: "Zero Waste Lifestyle" },
        { value: "170", label: "Environmental Activism" }
    ],
];

// const hobbiesInterests = [
//     { value: 1, label: "Hiking" },
//     { value: 2, label: "Camping" },
//     { value: 3, label: "Fishing" },
//     { value: 4, label: "Hunting" },
//     { value: 5, label: "Rock Climbing" },
//     { value: 6, label: "Bird Watching" },
//     { value: 7, label: "Kayaking" },
//     { value: 8, label: "Canoeing" },
//     { value: 9, label: "Surfing" },
//     { value: 10, label: "Snowboarding" },
//     { value: 11, label: "Skiing" },
//     { value: 12, label: "Mountain Biking" },
//     { value: 13, label: "Road Biking" },
//     { value: 14, label: "Running" },
//     { value: 15, label: "Jogging" },
//     { value: 16, label: "Trail Running" },
//     { value: 17, label: "Paddleboarding" },
//     { value: 18, label: "Sailing" },
//     { value: 19, label: "Horseback Riding" },
//     { value: 20, label: "Gardening" },
//     { value: 21, label: "Stargazing" },
//     { value: 22, label: "Geocaching" },
//     { value: 23, label: "Off-roading" },
//     { value: 24, label: "Archery" },
//     { value: 25, label: "Skateboarding" },
//     { value: 26, label: "Basketball" },
//     { value: 27, label: "Football (American)" },
//     { value: 28, label: "Soccer" },
//     { value: 29, label: "Baseball" },
//     { value: 30, label: "Softball" },
//     { value: 31, label: "Volleyball" },
//     { value: 32, label: "Tennis" },
//     { value: 33, label: "Badminton" },
//     { value: 34, label: "Golf" },
//     { value: 35, label: "Swimming" },
//     { value: 36, label: "Martial Arts" },
//     { value: 37, label: "Yoga" },
//     { value: 38, label: "Pilates" },
//     { value: 39, label: "CrossFit" },
//     { value: 40, label: "Weightlifting" },
//     { value: 41, label: "Boxing" },
//     { value: 42, label: "Wrestling" },
//     { value: 43, label: "Cheerleading" },
//     { value: 44, label: "Gymnastics" },
//     { value: 45, label: "Dance" },
//     { value: 46, label: "Ice Hockey" },
//     { value: 47, label: "Lacrosse" },
//     { value: 48, label: "Cricket" },
//     { value: 49, label: "Ultimate Frisbee" },
//     { value: 50, label: "Rugby" },
//     { value: 51, label: "Painting" },
//     { value: 52, label: "Drawing" },
//     { value: 53, label: "Sketching" },
//     { value: 54, label: "Sculpting" },
//     { value: 55, label: "Pottery" },
//     { value: 56, label: "Knitting" },
//     { value: 57, label: "Crocheting" },
//     { value: 58, label: "Sewing" },
//     { value: 59, label: "Quilting" },
//     { value: 60, label: "Embroidery" },
//     { value: 61, label: "Woodworking" },
//     { value: 62, label: "Metalworking" },
//     { value: 63, label: "Calligraphy" },
//     { value: 64, label: "Photography" },
//     { value: 65, label: "Videography" },
//     { value: 66, label: "Filmmaking" },
//     { value: 67, label: "Acting" },
//     { value: 68, label: "Singing" },
//     { value: 69, label: "Songwriting" },
//     { value: 70, label: "Playing Musical Instruments (Guitar, Piano, Drums, etc.)" },
//     { value: 71, label: "Dancing (Ballet, Hip Hop, Salsa, etc.)" },
//     { value: 72, label: "Crafting" },
//     { value: 73, label: "Jewelry Making" },
//     { value: 74, label: "Writing (Poetry, Novels, etc.)" },
//     { value: 75, label: "Journaling" },
//     { value: 76, label: "Reading" },
//     { value: 77, label: "Watching Movies" },
//     { value: 78, label: "Binge-watching TV Shows" },
//     { value: 79, label: "Theater" },
//     { value: 80, label: "Opera" },
//     { value: 81, label: "Stand-up Comedy" },
//     { value: 82, label: "Attending Concerts" },
//     { value: 83, label: "Music Festivals" },
//     { value: 84, label: "Podcasts" },
//     { value: 85, label: "Gaming (Video Games, Board Games, Card Games, etc.)" },
//     { value: 86, label: "Puzzle Solving (Crosswords, Sudoku, etc.)" },
//     { value: 87, label: "Trivia" },
//     { value: 88, label: "Watching Sports" },
//     { value: 89, label: "Cosplaying" },
//     { value: 90, label: "Collecting (Stamps, Coins, Comics, etc.)" },
//     { value: 91, label: "Magic Tricks" },
//     { value: 92, label: "Cooking" },
//     { value: 93, label: "Baking" },
//     { value: 94, label: "Grilling/BBQ" },
//     { value: 95, label: "Mixology" },
//     { value: 96, label: "Wine Tasting" },
//     { value: 97, label: "Beer Brewing" },
//     { value: 98, label: "Coffee Tasting" },
//     { value: 99, label: "Tea Tasting" },
//     { value: 100, label: "Food Blogging" },
//     { value: 101, label: "Trying New Restaurants" },
//     { value: 102, label: "Vegetarian/Vegan Cooking" },
//     { value: 103, label: "Traveling" },
//     { value: 104, label: "Road Trips" },
//     { value: 105, label: "Exploring New Cities" },
//     { value: 106, label: "Visiting Museums" },
//     { value: 107, label: "Visiting Art Galleries" },
//     { value: 108, label: "Attending Festivals" },
//     { value: 109, label: "Volunteering" },
//     { value: 110, label: "Charity Work" },
//     { value: 111, label: "Social Clubs" },
//     { value: 112, label: "Book Clubs" },
//     { value: 113, label: "Networking Events" },
//     { value: 114, label: "Public Speaking" },
//     { value: 115, label: "Debate" },
//     { value: 116, label: "Language Learning" },
//     { value: 117, label: "Cultural Events" },
//     { value: 118, label: "Coding" },
//     { value: 119, label: "Robotics" },
//     { value: 120, label: "3D Printing" },
//     { value: 121, label: "Virtual Reality" },
//     { value: 122, label: "Augmented Reality" },
//     { value: 123, label: "Building Computers" },
//     { value: 124, label: "Electronics" },
//     { value: 125, label: "Astronomy" },
//     { value: 126, label: "Science Experiments" },
//     { value: 127, label: "Drone Flying" },
//     { value: 128, label: "Chess" },
//     { value: 129, label: "Strategy Games" },
//     { value: 130, label: "Philosophy" },
//     { value: 131, label: "History" },
//     { value: 132, label: "Archaeology" },
//     { value: 133, label: "Anthropology" },
//     { value: 134, label: "Psychology" },
//     { value: 135, label: "Economics" },
//     { value: 136, label: "Politics" },
//     { value: 137, label: "Debate" },
//     { value: 138, label: "Mathematics" },
//     { value: 139, label: "Cryptography" },
//     { value: 140, label: "Puzzles" },
//     { value: 141, label: "Bird Watching" },
//     { value: 142, label: "Wildlife Photography" },
//     { value: 143, label: "Beekeeping" },
//     { value: 144, label: "Dog Training" },
//     { value: 145, label: "Cat Care" },
//     { value: 146, label: "Reptile Keeping" },
//     { value: 147, label: "Fish Keeping" },
//     { value: 148, label: "Animal Rescue" },
//     { value: 149, label: "Farming" },
//     { value: 150, label: "Permaculture" },
//     { value: 151, label: "Collecting Antiques" },
//     { value: 152, label: "Miniatures" },
//     { value: 153, label: "Model Building" },
//     { value: 154, label: "Trainspotting" },
//     { value: 155, label: "Urban Exploration" },
//     { value: 156, label: "Home Improvement" },
//     { value: 157, label: "Interior Design" },
//     { value: 158, label: "Feng Shui" },
//     { value: 159, label: "Meditation" },
//     { value: 160, label: "Astrology" },
//     { value: 161, label: "Tarot Reading" },
//     { value: 162, label: "Numerology" },
//     { value: 163, label: "Genealogy" },
//     { value: 164, label: "Thrill Seeking (Skydiving, Bungee Jumping, etc.)" },
//     { value: 165, label: "Fandom Activities (Sci-Fi, Fantasy, etc.)" },
//     { value: 166, label: "Vlogging" },
//     { value: 167, label: "Blogging" },
//     { value: 168, label: "Sustainable Living" },
//     { value: 169, label: "Zero Waste Lifestyle" },
//     { value: 170, label: "Environmental Activism" }
// ];



export default hobbiesInterests;

```

# constants\Colors.ts

```ts
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    white: '#FFFFFF',
    black: '#000000',
    text: '#341D1D',
    textSecondary: '#867272',
    textInverted: '#FFFFFF',
    background: '#FDFFFF',
    backgroundSecondary: '#FFFAF8',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#DA2778',
    primaryLight: '#F76BB1',
    accent: '#7A37D0',
    secondary: '#F1F1F1',
    tertiary: '#D9D9D9',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tertiary: '#D9D9D9',
  },
};

```

# components\TypewriterEffect.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface TypewriterEffectProps {
    text: string;
    speed?: number;
    styling: object;
}

const TypewriterEffect = ({ text, speed = 150, styling }: TypewriterEffectProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(displayedText + text[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, displayedText, text, speed]);

    return <Text style={styling} numberOfLines={2} ellipsizeMode='tail'>{displayedText}</Text>;
};



export default TypewriterEffect;

```

# components\ThemedView.tsx

```tsx
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

```

# components\ThemedText.tsx

```tsx
import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});

```

# components\SurfButtomSheet.tsx

```tsx
import { Text, StyleSheet, FlatList, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Card, ListItem, RadioButton } from "react-native-ui-lib";
import Spacer from "./Spacer";
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '@/utils/storage';


export default function SurfButtomSheet({ closeAction }) {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [genderPreferenceKey, setGenderPreferenceKey] = useState(null);
    const [genderPreferenceValue, setGenderPreferenceValue] = useState(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useLayoutEffect(() => {
        console.log('useLayoutEffect called');
        setTimeout(() => {
            bottomSheetRef.current?.expand();
        }, 100);
    }, []);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // useEffect(() => {
    //     if (isMounted && bottomSheetRef && open === true) {
    //         bottomSheetRef.current?.expand();
    //     }
    // }, [isMounted, open, bottomSheetRef]);

    useEffect(() => {
        console.log('genderPreferenceKey state changed:', genderPreferenceKey);
    }, [genderPreferenceKey]);

    useEffect(() => {
        console.log('genderPreferenceValue state changed:', genderPreferenceValue);
    }, [genderPreferenceValue]);


    useFocusEffect(() => {
        console.log('useFocusEffect called');
        getData('genderPreference').then(genderPreferenceObj => {
            setGenderPreferenceKey(genderPreferenceObj.key)
            setGenderPreferenceValue(genderPreferenceObj.value)
            console.log('genderPreference', genderPreferenceObj.value)
        });
    });


    const onChangeHandler = (index) => {
        if (index === -1) {
            closeAction(false);
        }
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['70%']}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: Colors.light.accent }}
            backgroundStyle={{ backgroundColor: Colors.light.backgroundSecondary }}
            onChange={onChangeHandler}

        >
            <BottomSheetScrollView contentContainerStyle={styles.bottomSheet} >

                <View>
                    <Card flex center onPress={() => console.log('pressed me')} enableShadow={false} style={{ backgroundColor: 'transparent' }}>
                        <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters (4)</Text>
                    </Card>

                    <Spacer height={24} />

                    <ListItem onPress={() => console.log('(modals)/setGenderPreference')} style={[styles.bottomSheetListItem, styles.firstItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Gender</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>{genderPreferenceValue}</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Age</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>30-40</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.lastItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Distance</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>60 km</Text>
                        </ListItem.Part>
                    </ListItem>

                    <Spacer height={32} />

                    <Text style={{ fontFamily: 'BodyBold', fontSize: 14, lineHeight: 22, color: Colors.light.textSecondary, textAlign: 'center' }}>MORE ABOUT YOUR IDEAL MATCH</Text>

                    <Spacer height={8} />

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.firstItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Interests</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>Basketball +2</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Has a bio</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Pronounce</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Sexual Orientation</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Starsign</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Accendant</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Some more here</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>And there</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Everywhere</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>All at</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>

                    <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.lastItem]}>
                        <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                            <Text style={styles.listItemLabel}>Once</Text>
                            <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                        </ListItem.Part>
                    </ListItem>
                </View>


            </BottomSheetScrollView>
        </BottomSheet>
    );
}


const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderRadius: 0,
        borderTopWidth: 0,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});

```

# components\Spacer.tsx

```tsx
import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
    height: number;
};

const Spacer: React.FC<SpacerProps> = ({ height }) => {
    return (
        <View style={{ height }} />
    );
};

export default Spacer;

```

# components\RootNavigator.tsx

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Auth from '@/components/Auth';
import { View, Text, Image, Pressable, Platform } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native'
import Me from '@/components/tabs/me';
import Surf from '@/components/tabs/surf';
import Dive from '@/components/tabs/dive';
import Profile from '@/app/profile';
import Onboarding from '@/app/onboarding';
import SearchFilters from '@/app/searchFilters';
import FilterGenderPreference from '@/app/searchFilters/filterGenderPreference';
import FilterStarsign from '@/app/searchFilters/filterStarsign';
import FilterAgeRange from '@/app/searchFilters/filterAgeRange';
import FilterBodyType from '@/app/searchFilters/filterBodyType';
import FilterExerciseFrequency from '@/app/searchFilters/filterExerciseFrequency';
import FilterSmokingFrequency from '@/app/searchFilters/filterSmoking';
import FilterDrinkingFrequency from '@/app/searchFilters/filterDrinking';
import FilterCannabisFrequency from '@/app/searchFilters/filterCannabis';
import FilterDietPreference from '@/app/searchFilters/filterDietPreference';
import { useAppContext } from '@/providers/AppProvider';
import { clearAllStorage, getData, storeData } from '@/utils/storage';
import { useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ChannelList from '@/components/ChannelList';
import ChatChannel from '@/components/ChatChannel';
import { useChatContext } from 'stream-chat-expo';

const tabIcons = {
    homeActive: require('@/assets/images/icons/tab-home-active.png'),
    homeInactive: require('@/assets/images/icons/tab-home.png'),
    historyActive: require('@/assets/images/icons/tab-history-active.png'),
    historyInactive: require('@/assets/images/icons/tab-history.png'),
    inboxActive: require('@/assets/images/icons/tab-inbox-active.png'),
    inboxInactive: require('@/assets/images/icons/tab-inbox.png'),
    meActive: require('@/assets/images/icons/tab-me-active.png'),
    meInactive: require('@/assets/images/icons/tab-me.png'),
    exploreInactive: require('@/assets/images/icons/tab-explore.png'),
};




function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function DummySurf() {
    return <View />;
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="Details" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function TabNavigator() {
  const navigation = useNavigation();
  // const { client } = useChatContext();

  // const disconnectUser = useCallback(async () => {
  //     try {
  //       if (client && client.userID) {
  //         await client.disconnectUser();
  //         console.log('User disconnected successfully');
  //       }
  //     } catch (error) {
  //       console.error('Error disconnecting user:', error);
  //     }
  //   }, [client]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = focused ? tabIcons.homeActive : tabIcons.homeInactive;
          } else if (route.name === "History") {
            iconSource = focused
              ? tabIcons.historyActive
              : tabIcons.historyInactive;
          } else if (route.name === "Inbox") {
            iconSource = focused
              ? tabIcons.inboxActive
              : tabIcons.inboxInactive;
          } else if (route.name === "Me") {
            iconSource = focused ? tabIcons.meActive : tabIcons.meInactive;
          } else if (route.name === "Explore") {
            return (
              <Pressable
                style={{ marginTop: Platform.OS === "ios" ? 0 : -4 }}
                onPress={() => {
                  // disconnectUser()
                  navigation.navigate("Home"); // TODO: fix this hack. chat has to be disconnected when navigating from inbox to anywhere. when you close dive/surf, inbox will still be focused when coming from there. So we move to home to reset that.
                  navigation.navigate("Dive");
                }}
              >
                <Image
                  source={require("@/assets/images/icons/tab-explore.png")}
                />
              </Pressable>
            );
          }

          return <Image source={iconSource} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: Platform.OS === "ios" ? 80 : 48 },
        // tabBarBackground: () => (
        //     <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        //   ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={SettingsScreen} />
      <Tab.Screen name="Explore" component={DummySurf} />
      <Tab.Screen
        name="Inbox"
        component={ChannelList}
        options={{ tabBarBadge: 6 }}
      />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
}






export default function RootNavigator({ session }) {
    const { showOnboarding, setShowOnboarding } = useAppContext();
    


    useEffect(() => {
      //   clearAllStorage();
      //   return;

      const checkIfOnboardingDone = async () => {
        try {
          const onboardingComplete = await getData("onboardingComplete");

          if (onboardingComplete === undefined) {
            console.log("onboarding status undefined in storage");

            const getProfile = async () => {
              try {
                const { data } = await supabase
                  .from("profiles_test")
                  .select("name")
                  .eq("id", session?.user.id)
                  .single();

                if (data) {
                  if (data?.name != null) {
                    console.log("onboarding done, saving it in storage");
                    await storeData("onboardingComplete", true);
                  } else {
                    console.log("onboarding not done");
                    setShowOnboarding(true);
                  }
                }
              } catch (error: any) {
                console.log("Error getting profile:", error);
              }
            };

            getProfile();
          } else {
            console.log(
              "onboarding status found in storage",
              onboardingComplete
            );
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
        }
      };

      if (session) {
        checkIfOnboardingDone();
      }
    }, [session?.user.id]);









    return (
        // <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Main'>
                {session ? (
                    showOnboarding === true ? <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} /> : (
                        <Stack.Group>
                            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.BottomSheetAndroid }}>
                                <Stack.Screen name="Main" component={TabNavigator} />
                                <Stack.Screen name="Surf" component={Surf} options={{ gestureEnabled: true, gestureDirection: 'vertical', gestureResponseDistance: 400 }} />
                                <Stack.Screen name="Dive" component={Dive} />
                                <Stack.Screen name="Profile" component={Profile} />
                                <Stack.Screen name="SearchFilters" component={SearchFilters} />
                                <Stack.Screen name="ChatChannel" component={ChatChannel} options={{ headerShown: true }} />
                            </Stack.Group>
                            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
                                <Stack.Screen name="filterGenderPreference" component={FilterGenderPreference} />
                                <Stack.Screen name="filterStarsign" component={FilterStarsign} />
                                <Stack.Screen name="filterAgeRange" component={FilterAgeRange} />
                                <Stack.Screen name="filterBodyType" component={FilterBodyType} />
                                <Stack.Screen name="filterExerciseFrequency" component={FilterExerciseFrequency} />
                                <Stack.Screen name="filterSmokingFrequency" component={FilterSmokingFrequency} />
                                <Stack.Screen name="filterDrinkingFrequency" component={FilterDrinkingFrequency} />
                                <Stack.Screen name="filterCannabisFrequency" component={FilterCannabisFrequency} />
                                <Stack.Screen name="filterDietPreference" component={FilterDietPreference} />
                            </Stack.Group>
                        </Stack.Group>
                    )
                ) : (
                    <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        // </NavigationContainer>
    );
}






```

# components\ExternalLink.tsx

```tsx
import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}

```

# components\ErrorBoundary.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Something went wrong.</Text>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    text: {
        fontSize: 18,
        color: Colors.light.text,
    },
});

export default ErrorBoundary;
```

# components\CrushyTypewriterEffect.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Text, TextStyle } from 'react-native';

interface TypewriterEffectProps {
    text: string;
    delay?: number;
    style?: TextStyle;
    adjustsFontSizeToFit?: boolean;
    numberOfLines?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay = 100, style, adjustsFontSizeToFit, numberOfLines }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(timer);
            }
        }, delay);

        return () => clearInterval(timer);
    }, [text, delay]);

    return <Text style={style} adjustsFontSizeToFit={adjustsFontSizeToFit} numberOfLines={numberOfLines} >{displayedText}</Text>;
};

export default TypewriterEffect;
```

# components\Collapsible.tsx

```tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});

```

# components\ChatChannel.tsx

```tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

export default function ChatChannelScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { channelId } = route.params;
  const { client } = useChatContext();
  const [channel, setChannel] = useState();

  useEffect(() => {
    const createAndWatchChannel = async () => {
      const newChannel = client.channel("messaging", channelId);
      await newChannel.watch();
      setChannel(newChannel);

      // Get member IDs
      const memberIds = Object.keys(newChannel.state.members);
      console.log("Member IDs:", memberIds);

      // Fetch user data from Supabase
      const { data: users, error } = await supabase
        .from("profiles_test")
        .select("id, name")
        .in("id", memberIds);

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      console.log("Fetched user data:", users);

      // Map user names
      const memberNames = memberIds.map((id) => {
        const user = users.find((u) => u.id === id);
        return user ? user.name : "Unknown User";
      });

      console.log("Channel members:", memberNames);

      // Find the other user (assuming 1-on-1 chat)
      const otherUser = users.find((u) => u.id !== client.userID);
      const otherUserName = otherUser ? otherUser.name : "Unknown User";
      console.log("Other user name:", otherUserName);

      // Set the channel name to the other user's name
      if (otherUserName && otherUserName !== "Unknown User") {
        navigation.setOptions({
          headerTitle: otherUserName,
        });
      }
    };

    createAndWatchChannel();
  }, [channelId, client, navigation, supabase]);

  if (!channelId || !channel) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Channel
        channel={channel}
        overrideOwnCapabilities={{
          uploadFile: false,
          sendLinks: false,
        }}
      >
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}

```

# components\ChannelList.tsx

```tsx
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { connectUser } from "@/lib/streamChat";
import { useChatContext, ChannelList } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { ActivityIndicator } from "react-native";

type Match = {
  id: string;
  name: string;
  avatar_url: string;
};

export default function Inbox() {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigation = useNavigation();
  const session = useAuth();
  const { client } = useChatContext();
  const [clientReady, setClientReady] = useState(false);
  const [myChannels, setChannels] = useState();
  const [matchesFetched, setMatchesFetched] = useState(false);

  let connectingUser = false;

  function generateShortChannelId(userId1: string, userId2: string): string {
    // Sort the user IDs to ensure consistency
    const sortedIds = [userId1, userId2].sort();

    // Combine the first 8 characters of each ID
    const combined = sortedIds[0].slice(0, 8) + sortedIds[1].slice(0, 8);

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert hash to a string and take the first 16 characters
    return Math.abs(hash).toString(36).slice(0, 16);
  }

  // Function to connect user
  const setupClient = useCallback(async () => {
    if (!session?.user?.id || clientReady) return;

    try {
      // TODO: Add logic to check if user is already connected (at the end of the onboarding the user gets created in stream chat
      console.log("Connecting user...");
      await connectUser({ id: session.user.id });
      console.log("User connected successfully");
      setClientReady(true);
    } catch (error) {
      console.error("Failed to connect user", error);
    }
  }, [session?.user?.id, clientReady]);

  // Function to fetch matches
  const fetchMatches = useCallback(async () => {
    if (!clientReady || matchesFetched) return;

    try {
      console.log("Fetching matches...");

      try {
        const { data: matches, error } = await supabase
          .from("matches")
          .select(
            "*, user1:profiles_test!user1_id(*), user2:profiles_test!user2_id(*)"
          )
          .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
          .eq("matched", true);

        if (error) throw error;

        // Ensure all users exist in Stream Chat
        const allUsers = matches.flatMap((match) => [match.user1, match.user2]);
        await ensureUsersExist(client, allUsers);

        const channelPromises = matches.map(async (match) => {
          const otherUser =
            match.user1_id === session.user.id ? match.user2 : match.user1;
          const channelId = generateShortChannelId(
            session.user.id,
            otherUser.id
          );

          console.log(
            `Attempting to create/fetch channel for users: ${session.user.id} and ${otherUser.id}`
          );
          console.log(`Generated channel ID: ${channelId}`);

          let channel = client.channel("messaging", channelId, {
            members: [session.user.id, otherUser.id],
            name: otherUser.name,
          });

          try {
            await channel.create();
            console.log("Channel created successfully:", channel.id);
          } catch (error) {
            if (error.code === 4) {
              console.log("Channel already exists:", channel.id);
            } else {
              console.error("Error creating channel:", error);
            }
          }

          return channel;
        });

        const createdChannels = await Promise.all(channelPromises);
        setChannels(createdChannels);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }

      setMatchesFetched(true);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }, [clientReady, matchesFetched]);

  // Effect for connecting user
  useEffect(() => {
    if (client && !clientReady) {
      setupClient();
    }
  }, [client, clientReady, setupClient]);

  // Effect for fetching matches
  useEffect(() => {
    if (clientReady && !matchesFetched) {
      fetchMatches();
    }
  }, [clientReady, matchesFetched, fetchMatches]);

  async function ensureUsersExist(
    client: StreamChat,
    users: { id: string; name: string }[]
  ) {
    for (const user of users) {
      try {
        await client.upsertUser({ id: user.id, name: user.name });
        console.log(`User ${user.id} ensured in Stream Chat`);
      } catch (error) {
        console.error(`Error ensuring user ${user.id} exists:`, error);
      }
    }
  }

  if (!session?.user) {
    return null;
  }

  if (!clientReady || !matchesFetched) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [session.user.id] },
        }}
        sort={{ last_message_at: -1 }}
        onSelect={(channel) => {
          console.log("Selected channel:", channel.id);
          navigation.navigate("ChatChannel", {
            channelId: channel.id,
          });
        }}
      />
    </SafeAreaView>
  );
}

```

# components\Avatar.tsx

```tsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Image, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { SecondaryButton, SecondaryButtonText } from './ui/Buttons'
import Spacer from './Spacer'
import { defaultStyles } from '@/constants/Styles'
import { Colors } from '@/constants/Colors'
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

interface Props {
    size: number | string
    url: string | null
    onUpload: (filePath: string) => void
}

function extractFullFilename(url) {
    // Split the URL by '/' and get the last part
    const fullFilename = url.split('/').pop();

    // If there's no filename (URL ends with '/'), return null
    if (!fullFilename) return null;

    // Return the full filename
    return fullFilename;
}

export default function Avatar({ url, size = 70, onUpload }: Props) {
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const avatarSize = { width: size + '%' }

    useEffect(() => {
        if (url) {
            if (url.toLowerCase().includes('http')) {
                downloadImage(extractFullFilename(url))
            } else {
                downloadImage(url)
            }
        }
    }, [url])

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)

            if (error) {
                throw error
            }

            const fr = new FileReader()
            fr.readAsDataURL(data)
            fr.onload = () => {
                setAvatarUrl(fr.result as string)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }




    async function pixelateImage(uri: string, pixelBlocks = 15) {
        try {
            // Get the original image dimensions
            const originalImage = await ImageManipulator.manipulateAsync(
                uri,
                [],
                { format: 'png' }
            );

            // Get dimensions
            const { width, height } = await new Promise((resolve, reject) => {
                Image.getSize(originalImage.uri,
                    (width, height) => resolve({ width, height }),
                    (error) => reject(error)
                );
            });

            console.log('Original dimensions:', width, height);

            // Calculate new dimensions based on the number of pixel blocks
            const newWidth = pixelBlocks;
            const newHeight = Math.round((height / width) * pixelBlocks);

            console.log('New dimensions for pixelation:', newWidth, newHeight);

            // Resize the image to a very small size
            const smallImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: newWidth, height: newHeight } }],
                { format: 'png' }
            );

            // Resize it back to original size, creating a more pronounced pixelation effect
            const pixelatedImage = await ImageManipulator.manipulateAsync(
                smallImage.uri,
                [{ resize: { width: width, height: height } }],
                { format: 'png' }
            );

            console.log('Pixelation complete');
            return pixelatedImage.uri;
        } catch (error) {
            console.error('Error in pixelateImage:', error);
            throw error;
        }
    }

    async function uploadAvatar() {
        try {
            setUploading(true)

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true,
                quality: 1,
                exif: false,
            })

            if (result.canceled || !result.assets || result.assets.length === 0) {
                console.log('User cancelled image picker.')
                return
            }

            const image = result.assets[0]
            console.log('Got image', image)

            if (!image.uri) {
                throw new Error('No image uri!')
            }

            // Read the file as base64
            const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: FileSystem.EncodingType.Base64 });
            console.log('Base64 length:', base64.length);

            // Upload original image
            const originalPath = `${Date.now()}_original.jpg`
            const { data: originalData, error: originalError } = await supabase.storage
                .from('avatars')
                .upload(originalPath, decode(base64), {
                    contentType: 'image/jpeg'
                });

            if (originalError) {
                console.error('Original upload error:', originalError);
                throw originalError
            }

            console.log('Original upload successful:', originalData);

            // Create and upload pixelated version
            const pixelatedUri = await pixelateImage(image.uri, 15) // 15x15 pixel blocks for a very pixelated effect
            const pixelatedBase64 = await FileSystem.readAsStringAsync(pixelatedUri, { encoding: FileSystem.EncodingType.Base64 });
            console.log('Pixelated Base64 length:', pixelatedBase64.length);

            const pixelatedPath = `${Date.now()}_pixelated.jpg`
            const { data: pixelatedData, error: pixelatedError } = await supabase.storage
                .from('avatars')
                .upload(pixelatedPath, decode(pixelatedBase64), {
                    contentType: 'image/jpeg'
                });

            if (pixelatedError) {
                console.error('Pixelated upload error:', pixelatedError);
                throw pixelatedError
            }

            console.log('Pixelated upload successful:', pixelatedData);

            // Get public URLs
            const originalUrl = supabase.storage.from('avatars').getPublicUrl(originalData.path).data.publicUrl
            const pixelatedUrl = supabase.storage.from('avatars').getPublicUrl(pixelatedData.path).data.publicUrl

            // Update profiles_test table
            const { data, error: updateError } = await supabase
                .from('profiles_test')
                .update({
                    avatar_url: originalUrl,
                    avatar_pixelated_url: pixelatedUrl
                })
                .eq('id', (await supabase.auth.getUser()).data.user?.id)

            if (updateError) {
                console.error('Profile update error:', updateError);
                throw updateError
            }

            console.log('Profile updated with new avatar URLs:', originalUrl, pixelatedUrl)

            onUpload(originalData.path)
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message)
            } else {
                Alert.alert('Error', 'An unknown error occurred')
            }
            console.error('Error in uploadAvatar:', error)
        } finally {
            setUploading(false)
        }
    }




    // Helper function to decode base64
    function decode(base64: string) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let bufferLength = base64.length * 0.75,
            length = base64.length, i, p = 0,
            encoded1, encoded2, encoded3, encoded4;

        const bytes = new Uint8Array(bufferLength);

        for (i = 0; i < length; i += 4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i + 1]);
            encoded3 = chars.indexOf(base64[i + 2]);
            encoded4 = chars.indexOf(base64[i + 3]);

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }

        return bytes.buffer;
    }

    return (
        <View>
            <Spacer height={24} />

            <SecondaryButton onPress={uploadAvatar} style={defaultStyles.buttonShadow} disabled={uploading}>
                <SecondaryButtonText>{uploading ? 'Uploading ...' : 'Upload'}</SecondaryButtonText>
            </SecondaryButton>

            <Spacer height={24} />

            {avatarUrl ? (
                <Image
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize, styles.avatar, styles.image]}
                />
            ) : (
                uploading ? <ActivityIndicator size="large" color={Colors.light.accent} /> : <Spacer height={0} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 16,
        overflow: 'hidden',
        maxWidth: '100%',
        aspectRatio: 2 / 3,
    },
    image: {
        objectFit: 'cover',
        paddingTop: 0,
        marginHorizontal: 'auto'
    },
    noImage: {
        backgroundColor: Colors.light.backgroundSecondary,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(200, 200, 200)',
        borderRadius: 16,
    },
})
```

# components\Auth.tsx

```tsx
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Keyboard, StatusBar } from 'react-native'
import { supabase } from '@/lib/supabase'
import { Button, Text } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from './Spacer';
import { Textfield } from '@/components/ui/Textfields';
import { Pageview } from '@/components/ui/Containers';
import { useColorScheme } from "nativewind";

import { Image, Animated, FlatList, useWindowDimensions, ImageSourcePropType } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons';
import { useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';





export default function Auth({ onboarding }: any) {
    const { colorScheme, setColorScheme } = useColorScheme();

    const [mode, setMode] = useState('welcome');
    const [email, setEmail] = useState('android@mail.com')
    const [password, setPassword] = useState('Marsmx23!')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;


    const onboardingContent = [
        {
            id: 1,
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding1.png'),
        },
        {
            id: 2,
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding2.png'),
        },
        {
            id: 3,
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding3.png'),
        },
        {
            id: 4,
            title: 'Step 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding4.png'),
        },
        {
            id: 5,
            title: 'Step 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding5.png'),
        }
    ]

    interface OnboardingItem {
        id: number;
        title: string;
        description: string;
        image: ImageSourcePropType;
    }

    const { width } = useWindowDimensions();

    function renderItem({ item }: { item: OnboardingItem }) {
        return (
            <View className='' >
                <Image source={item.image} style={{ width }} />
                {/* <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View> */}
            </View >
        )

    }


    const scrollX = useRef(new Animated.Value(0)).current;

    const Pagination = ({ count }: { count: number }) => {
        return (
            <View className='flex-row justify-center'>
                {Array(count).fill(0).map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#cccccc', '#7A37D0', '#cccccc'],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={index}
                            className='w-2 h-2 mx-1 rounded-full'
                            style={{ backgroundColor: dotColor }}
                        />
                    );
                })}
            </View>
        );
    };

    // TODO: make email lowercase
    async function signInWithEmail() {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format')
            return
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must be at least 6 characters long, contain one capital letter, and include both letters and numbers')
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format')
            return
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password', 'Password is too easy to guess. Please use a stronger password. See below for requirements.')
            return
        }
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        //if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)


        if (session) {
            // User is logged in
            console.log('User is logged in:', session.user);
        } else {
            //Alert.alert('Please check your inbox for email verification!');
        }
    }



    const [keyboardStatus, setKeyboardStatus] = useState('');

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Keyboard Shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('Keyboard Hidden');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            {mode === 'signin' && (

                <Pageview className='flex justify-space-between h-full'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Hello again!</Text>

                        <Spacer height={64} />

                        <Text className='text-sm font-bold'>E-Mail</Text>
                        <Spacer height={4} />
                        <Textfield
                            onChangeText={(text) => setEmail(text)}
                        />

                        <Spacer height={16} />

                        <Text className='text-sm font-bold'>Password</Text>
                        <Spacer height={4} />
                        <View className='flex-row items-center relative'>
                            <Textfield
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>

                        <Spacer height={64} />

                        <Button onPress={() => signInWithEmail()} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                            <Text style={defaultStyles.buttonLabel}>Sign in</Text>
                        </Button>

                        <Spacer height={32} />

                        <TouchableOpacity
                            className='ml-4 mt-3'
                            onPress={() => { }}
                        >
                            <Text className='text-center text-primary-500'>Forgot password?</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        className={keyboardStatus === 'Keyboard Shown' ? 'hidden' : 'ml-4 mt-3'}
                        onPress={() => setMode('signup')}
                    >
                        <Text className='text-center'>New here? <Text className='text-primary-500'>Create an account</Text></Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                    <TouchableOpacity
                        className={keyboardStatus === 'Keyboard Shown' ? 'hidden' : 'ml-4 mt-3'}
                        onPress={() => setMode('welcome')}
                    >
                        <Text className='text-center text-primary-500'>Back to welcome screen</Text>
                    </TouchableOpacity>

                </Pageview >
            )}

            {mode === 'signup' && (

                <Pageview className='flex justify-space-between h-full'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Welcome!</Text>

                        <Spacer height={64} />

                        <Text className='text-sm font-bold'>E-Mail</Text>
                        <Spacer height={4} />
                        <Textfield
                            onChangeText={(text) => setEmail(text)}
                        />

                        <Spacer height={16} />

                        <Text className='text-sm font-bold'>Password</Text>
                        <Spacer height={4} />
                        <View className='flex flex-row items-center justify-between'>
                            <Textfield
                                className='flex-1'
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                className='flex-none ml-4'
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Spacer height={8} />

                        <Text className='text-gray-500 leading-5'>Minimum 6 characters, and one each: uppercase/lowercase letter, number, special character.</Text>

                        <Spacer height={48} />

                        <Button onPress={() => signUpWithEmail()} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                            <Text style={defaultStyles.buttonLabel}>Sign up</Text>
                        </Button>

                        <Spacer height={16} />

                        <Text className='leading-5'>By signing up, you agree to our <Text className='text-primary-500'>Terms of Service</Text> and <Text className='text-primary-500'>Privacy Policy</Text>.</Text>

                    </View>

                    <TouchableOpacity
                        className={keyboardStatus === 'Keyboard Shown' ? 'hidden' : 'ml-4 mt-3'}
                        onPress={() => setMode('signin')}
                    >
                        <Text className='text-center'>Already have an account? <Text className='text-primary-500'>Sign in</Text></Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                    <TouchableOpacity
                        className={keyboardStatus === 'Keyboard Shown' ? 'hidden' : 'ml-4 mt-3'}
                        onPress={() => setMode('welcome')}
                    >
                        <Text className='text-center text-primary-500'>Back to welcome screen</Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                </Pageview >
            )}

            {mode === 'welcome' && (
                <View className='flex h-full justify-between'>
                    <View className='flex'>
                        <Spacer height={16} />
                        <Image source={require('@/assets/images/logo/logo_crushy.png')} className='m-auto' />
                        <FlatList
                            data={onboardingContent}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            bounces={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                        />
                        <Pagination count={onboardingContent.length} />
                        <Spacer height={64} />
                    </View>
                    <View className='flex p-6'>
                        <Button onPress={() => setMode('signup')} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                            <Text style={defaultStyles.buttonLabel}>Create account</Text>
                        </Button>

                        <Spacer height={16} />

                        <Button onPress={() => setMode('signin')} style={[defaultStyles.buttonSecondary, defaultStyles.buttonShadow]}>
                            <Text style={defaultStyles.buttonSecondaryLabel}>Sign in</Text>
                        </Button>

                    </View>
                    <Spacer height={24} />
                </View>
            )}
        </SafeAreaView >
    )
}




const styles = StyleSheet.create({


    passwordInput: {
        flex: 1,
    },

})








```

# components\Account.tsx

```tsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'

import Avatar from './Avatar'


export default function Account({ session }: { session: Session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')


    // THIS DATE IS COMING FROM _layout.tsx

    // useEffect(() => {
    //     if (session) getProfile()
    // }, [session])

    // async function getProfile() {
    //     try {
    //         setLoading(true)
    //         if (!session?.user) throw new Error('No user on the session!')

    //         const { data, error, status } = await supabase
    //             .from('profiles_test')
    //             .select(`username, website, avatar_url`)
    //             .eq('id', session?.user.id)
    //             .single()
    //         if (error && status !== 406) {
    //             throw error
    //         }

    //         if (data) {
    //             setUsername(data.username)
    //             setWebsite(data.website)
    //             setAvatarUrl(data.avatar_url)
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             Alert.alert(error.message)
    //         }
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string
        website: string
        avatar_url: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles_test').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>

            <View>
                <Avatar
                    size={200}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url)
                        updateProfile({ username, website, avatar_url: url })
                    }}
                />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Loading ...' : 'Update'}
                    onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                    disabled={loading}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})
```

# app-example\_layout.tsx

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

```

# app-example\index.tsx

```tsx
// import { Text, View, Image } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//       <Image source={require('@/assets/images/icons/tab-home.png')} />
//     </View>
//   );
// }


// import { Image, StyleSheet, Platform } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function Home() {
//   return (
//     <ThemedView>
//       <ThemedText type="title">Homey</ThemedText>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

```

# app-example\+not-found.tsx

```tsx
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

```

# app-example\+html.tsx

```tsx
import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;

```

# app\profile.tsx

```tsx
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import hobbiesInterests from '@/constants/Interests'
import { Chip } from 'react-native-ui-lib';
import { useAuth } from '@/hooks/useAuth';
import Spacer from '@/components/Spacer';
import { useRoute } from '@react-navigation/native';


export default function Profile({ route, navigation }) {
    const session = useAuth();
    const { id, imageUrl } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any[]>({ name: '', age: '0', interests: [] });
    const interestsList = useMemo(() => flattenArray(hobbiesInterests), []);
    const [hasSharedInterests, setHasSharedInterests] = useState<boolean>(false);
    const [myData, setMyData] = useState<any>({});


    useEffect(() => {
        const fetchMe = async () => {

            setLoading(true)

            const { data } = await supabase
                .from('profiles_test')
                .select('*')
                .eq('id', session?.user.id);
            if (data) {
                setMyData(data[0])
                setLoading(false)
            }
        }

        fetchMe();

    }, [session]);


    useEffect(() => {

        const fetchUser = async () => {

            setLoading(true)

            const { data } = await supabase
                .from('profiles_test')
                .select('*')
                .eq('id', id)
            if (data) {
                setUser(data[0]);
                setLoading(false)
            }

        }

        fetchUser();

    }, [id]);


    const bioText = `I\’m looking for a new partner, perhaps a partner for life. I never used a dating app before, but I heard good things about this one.

I\’m a great listener, and a fantastic cook. I love walking along the beach, and deep conversations.
\nTalking is important to me. I need to be able to talk about anything with you.

I also love dogs and cats, though I don’t have any pets at the moment. But please keep away snakes, spiders and any kind of insects! I\’m afraid I will get a heart attack with those.

Videogames is also something that is important to me. I play mostly online, to not feel alone all the time. I enjoy board games as well, and TCG\’s.

When it comes to music, I like most pop bands and dance music. My favorite are Christina Aguilera, Taylor Swift, and the Woodys.

Let me know what  you like and let’s get connected here on this cool platform!`

    function flattenArray(arr: any[]): any[] {
        return arr.flat();
    }

    const sortInterests = (a: string, b: string) => {
        const aIncluded = myData.interests?.includes(parseInt(a));
        const bIncluded = myData.interests?.includes(parseInt(b));
        if (aIncluded && !bIncluded) return -1;
        if (!aIncluded && bIncluded) return 1;
        return 0;
    };

    const renderInterestChips = (type: string) => {

        if (!user.interests || !myData.interests) return null;

        const sortedInterests = [...user.interests].sort(sortInterests);

        return sortedInterests.map((interest: string, index: number) => {

            const interestObject = interestsList.find(item => item.value === interest.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interest}`);
                return null;
            }

            const isActive = myData.interests.includes(parseInt(interestObject.value));
            if (!hasSharedInterests && isActive) {
                setHasSharedInterests(true);
            }
            if (type === 'shared') {
                if (isActive) {
                    return (
                        <Chip
                            key={index}
                            label={interestObject.label}
                            labelStyle={[styles.chipLabel, styles.sharedChipLabel]}
                            containerStyle={[styles.chip, styles.sharedChip]}
                            iconSource={require('@/assets/images/icons/iconSharedInterest.png')}
                        />
                    );
                }
            } else {
                if (!isActive) {
                    return (
                        <Chip
                            key={index}
                            label={interestObject.label}
                            labelStyle={[styles.chipLabel]}
                            containerStyle={[styles.chip]}
                        />
                    );
                }
            }
        });
    };


    return (

        < SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }
        }>
            <ScrollView style={styles.innerContainer}>
                {loading && <ActivityIndicator size="large" color={Colors.light.accent} style={{ position: 'absolute', top: 32, left: 32, zIndex: 2 }} />}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Pressable onPress={() => { navigation.pop() }} style={[styles.buttonCollapse, defaultStyles.buttonShadow]} >
                        <Ionicons name="chevron-up" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={{ padding: 16 }}>
                    <View style={styles.personInfo}>
                        {user.name && <Text style={styles.personName}>{user.name}<Text style={styles.personAge}>, {user.age.toString()}</Text></Text>}
                    </View>


                    {hasSharedInterests === true && (
                        <View>
                            <Spacer height={32} />

                            <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Shared Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('shared')}
                            </View>
                        </View>
                    )}

                    <Spacer height={32} />

                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Bio</Text>
                    <Spacer height={8} />
                    <Text style={{ fontFamily: 'BodyRegular', fontSize: 18, lineHeight: 26 }}>{bioText}</Text>

                    <Spacer height={32} />

                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Other Hobbies & Interests</Text>
                    <View style={styles.chipsContainer}>
                        {renderInterestChips()}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: Colors.light.backgroundSecondary,
    },
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    personName: {
        fontFamily: 'HeadingBold',
        fontSize: 28,
        color: Colors.light.text,
    },
    personAge: {
        fontFamily: 'HeadingBold',
        fontSize: 28,
        color: Colors.light.text,
        opacity: 0.7
    },
    buttonCollapse: {
        backgroundColor: Colors.light.white,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        borderRadius: 99,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.black,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    chipsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        rowGap: 8,

    },
    chip: {
        backgroundColor: Colors.light.white,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 8,
        borderRadius: 99,
        shadowColor: Colors.light.black,
    },
    sharedChip: {
        paddingLeft: 12,
        backgroundColor: Colors.light.white,
    },
    sharedChipLabel: {
        color: Colors.light.text,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    scrollContainer: {
        marginLeft: 16,
    },
});
```

# app\onboarding.tsx

```tsx
import { Image, StyleSheet, Animated, Pressable, Dimensions, Alert, useWindowDimensions, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { Pageview } from '@/components/ui/Containers';
import Spacer from '@/components/Spacer';
import { FlatList } from 'react-native';
import { View, Card, CardProps, Text, RadioButton, Checkbox, Button } from 'react-native-ui-lib';
import { Textfield } from '@/components/ui/Textfields';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Toast, { ToastRef } from 'react-native-toast-message';
import hobbiesInterests from '@/constants/Interests';
import BigList from "react-native-big-list"
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { supabase } from '@/lib/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Avatar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native'
import { useAppContext } from '@/providers/AppProvider';
import { storeData } from '@/utils/storage';
import { isLoading } from 'expo-font';
import { connectUser } from "@/lib/streamChat";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const useOnboardingStore = create((set) => ({
  name: "",
  age: null,
  gender: null,
  pronouns: [],
  relationship: null,
  genderPreferences: null,
  interests: [],
  photoUploaded: false,
  dataUploaded: false,
  onboardingCompleted: false,
  setName: () => set((state: { name: string }) => ({ name: state.name })),
  setAge: () => set((state: { age: string }) => ({ age: state.age })),
  setGender: () =>
    set((state: { gender: string }) => ({ gender: state.gender })),
  setPronouns: () =>
    set((state: { pronouns: object }) => ({ pronouns: state.pronouns })),
  setRelationship: () =>
    set((state: { relationship: string }) => ({
      relationship: state.relationship,
    })),
  setGenderPreferences: () =>
    set((state: { genderPreferences: string }) => ({
      genderPreferences: state.genderPreferences,
    })),
  setInterests: () =>
    set((state: { interests: object }) => ({ interests: state.interests })),
}));

export default function Onboarding() {
  const session = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef(null);
  const { isLoading, setIsLoading } = useAppContext();
  const [listKey, setListKey] = useState(0); // used to force re-render of FlatList
  const [
    name,
    age,
    gender,
    pronouns,
    relationship,
    genderPreferences,
    interests,
    photoUploaded,
    dataUploaded,
    onboardingCompleted,
  ] = useOnboardingStore(
    useShallow((state) => [
      state.name,
      state.age,
      state.gender,
      state.pronouns,
      state.relationship,
      state.genderPreferences,
      state.interests,
      state.photoUploaded,
      state.dataUploaded,
      state.onboardingCompleted,
    ])
  );
  const toastConfig = {
    default: ({ text1, text2, props }) => (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          width: "94%",
          backgroundColor: Colors.light.accent,
          borderColor: Colors.light.white,
          borderRadius: 8,
          padding: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "HeadingBold",
            color: Colors.light.textInverted,
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            fontFamily: "BodyRegular",
            color: Colors.light.textInverted,
          }}
        >
          {text2}
        </Text>
      </View>
    ),
  };

  const steps: object[] = [
    { key: "1", title: "Step 1", component: StepName },
    { key: "2", title: "Step 2", component: StepAge },
    { key: "3", title: "Step 3", component: StepGender },
    { key: "4", title: "Step 4", component: StepPronouns },
    { key: "6", title: "Step 6", component: StepRelationship },
    { key: "7", title: "Step 7", component: StepGenderPreferences },
    { key: "8", title: "Step 8", component: StepInterests },
    { key: "9", title: "Step 9", component: StepPhoto },
  ];

  function handleNext() {
    console.log("currentStep:", currentStep);

    if (currentStep === 0) {
      if (name.length < 2) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Your name is too short",
        });
        return;
      }
      // check if name containes the words crushy or crush or official
      const words = [
        "crushy",
        "crush",
        "official",
        "admin",
        "administrator",
        "moderator",
        "ceo",
        "cmo",
        "cto",
      ];
      const contains = words.some((word) => name.toLowerCase().includes(word));
      if (contains) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "This name is not allowed",
        });
        return;
      }
    }
    if (currentStep === 1) {
      if (age === null || parseInt(age) > 111 || parseInt(age) < 17) {
        Toast.show({
          type: "default",
          text1: "👋 Check your age",
          text2: "You have to be 17 or older to continue",
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (gender === null) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please select your gender",
        });
        return;
      }
    }

    if (currentStep === 3) {
      if (pronouns === null || pronouns < 1) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please select at least one pronoun",
        });
        return;
      }
    }

    if (currentStep === 4) {
      if (relationship === null || relationship < 1) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please select what you are looking for",
        });
        return;
      }
    }

    if (currentStep === 5) {
      if (genderPreferences === null || genderPreferences < 1) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please select your gender preferences",
        });
        return;
      }
    }

    if (currentStep === 6) {
      if (interests.length === 0) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please select at least one hobby or interest",
        });
        return;
      }
    }

    if (currentStep === 7) {
      if (photoUploaded === false) {
        Toast.show({
          type: "default",
          text1: "👋 Hey",
          text2: "Please upload a photo",
        });
        return;
      } else {
        saveData();
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: currentStep + 1 });
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: currentStep - 1 });
      }
    }
  };

  const saveData = async () => {
    console.log("name:", name);
    console.log("age:", age);
    console.log("gender:", gender);
    console.log("pronouns:", pronouns);
    console.log("relationship:", relationship);
    console.log("genderPreferences:", genderPreferences);
    console.log("interests:", interests);

    try {
      const { data, error } = await supabase
        .from("profiles_test")
        .update({
          name: name,
          age: age,
          gender: gender,
          pronouns: pronouns,
          looking_for: relationship,
          gender_preference: genderPreferences,
          interests: interests,
        })
        .eq("id", session?.user.id)
        .select();

      // Create user in Stream Chat
      await createStreamChatUser(session.user);

      if (error) {
        console.error(error);
      } else {
        console.log(data);
        useOnboardingStore.setState({ dataUploaded: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function createStreamChatUser(user) {
    try {
      await connectUser({ id: user.id, name: name });
      console.log("User created in Stream Chat");
    } catch (error) {
      console.error("Error creating user in Stream Chat:", error);
      // TODO: Handle user creation error
      // Optionally, you might want to delete the Supabase user if Stream Chat user creation fails
      // await supabase.auth.api.deleteUser(user.id);
      throw new Error("Failed to create user in chat system");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        {dataUploaded ? (
          <StepFinal />
        ) : (
          <View className="flex h-full justify-between bg-white">
            <FlatList
              ref={flatListRef}
              data={steps}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEnabled={false}
              renderItem={({ item }) => React.createElement(item.component)}
              keyExtractor={(item) => item.key}
            />
            <View style={styles.buttonContainer}>
              {currentStep > 0 ? (
                <Button
                  onPress={handleBack}
                  style={[
                    defaultStyles.buttonSecondary,
                    defaultStyles.buttonShadow,
                  ]}
                  disabled={isLoading}
                >
                  <Text style={defaultStyles.buttonSecondaryLabel}>Back</Text>
                </Button>
              ) : (
                <View style={{ width: 16 }}></View>
              )}
              <Button
                onPress={handleNext}
                style={[defaultStyles.button, defaultStyles.buttonShadow]}
                disabled={isLoading}
              >
                <Text style={defaultStyles.buttonLabel}>Next</Text>
              </Button>
            </View>
          </View>
        )}
        <Toast config={toastConfig} />
      </View>
    </SafeAreaView>
  );
};



function Progress({ percent }: { percent: number }) {
    return (
        <View className='w-full h-2 bg-gray-200 rounded-full relative'>
            <View style={{ width: `${percent}%`, backgroundColor: Colors.light.accent }} className='h-2 absolute rounded-full'></View>
        </View>
    )
}


const StepName = () => {
    const [name, setName] = useState<string>('');

    return (
        <View className='p-6 w-screen'>

            <Spacer height={16} />

            <Progress percent={11} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What is your name?</Text>
            <Spacer height={8} />
            <View className=''>
                <Text style={defaultStyles.body}>This will be visible to all users. You can also choose a nickname if you would like.</Text>
            </View>

            <Spacer height={64} />

            <Text style={defaultStyles.inputLabel}>Firstname or Nickname</Text>
            <Spacer height={4} />
            <Textfield
                onChangeText={(text) => useOnboardingStore.setState({ name: text })}
            />
        </View>
    )
};

const StepAge = () => (
    <View className='p-6 w-screen'>
        <Spacer height={16} />

        <Progress percent={22} />

        <Spacer height={48} />

        <Text style={defaultStyles.h2}>How old are you</Text>
        <Spacer height={8} />
        <View className=''>
            <Text style={defaultStyles.body}>You can always change your settings later.</Text>
        </View>

        <Spacer height={64} />

        <Text style={defaultStyles.inputLabel}>Age</Text>
        <Spacer height={4} />
        <Textfield
            className='w-28 text-center'
            placeholder='XX'
            keyboardType='numeric'
            maxLength={3}
            onChangeText={(text) => useOnboardingStore.setState({ age: text })}
        />
    </View>
);

const StepGender = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ gender: value })
        console.log('Gender:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={33} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>How do you identify in terms of gender?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>We strive for inclusivity. If you don't see a gender that fits you, please let us know.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Male' },
                    { key: '2', title: 'Female' },
                    { key: '3', title: 'Male (Transgender)' },
                    { key: '4', title: 'Female (Transgender)' },
                    { key: '5', title: 'Non-binary' },
                    { key: '6', title: 'Genderqueer' },
                    { key: '7', title: 'Genderfluid' },
                    { key: '8', title: 'Agender' },
                    { key: '9', title: 'Two-Spirit' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepPronouns = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handlePress = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            if (selectedValues.length > 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'You can only select two pronouns',
                });
                return;
            }
            setSelectedValues([...selectedValues, value]);
        }
    };

    useEffect(() => {
        console.log('Pronouns:', selectedValues);
        useOnboardingStore.setState({ pronouns: selectedValues })
    }, [selectedValues]);

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={44} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your pronouns? ({selectedValues.length})</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Choose <Text style={defaultStyles.bodyBold}>up to two</Text> pronouns.You will be able to add your own in a future update, if you don't see yours.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'he/him' },
                    { key: '2', title: 'she/her' },
                    { key: '3', title: 'they/them' },
                    { key: '4', title: 'ze/zir' },
                    { key: '5', title: 'xe/xem' },
                    { key: '6', title: 've/ver' },
                    { key: '7', title: 'ey/em' },
                    { key: '99', title: 'other' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.key)}>
                        <Checkbox
                            color={selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary}
                            label={item.title}
                            value={selectedValues.includes(item.key) ? true : false}
                            containerStyle={[defaultStyles.checkboxButton, { borderColor: selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary }]}
                            labelStyle={defaultStyles.checkboxButtonLabel}
                            onValueChange={() => handlePress(item.key)}
                        />
                    </Pressable>
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepRelationship = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ relationship: value })
        console.log('Relationship:', value, typeof value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={55} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are you looking for right now?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>You can always change your settings later.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Relationship' },
                    { key: '2', title: 'Friend' },
                    { key: '3', title: 'Hookup' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepGenderPreferences = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ genderPreferences: value })
        console.log('Gender Preferences:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={66} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your gender preferences?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Please understand that this app is new. We will include more gender filters soon!</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Female' },
                    { key: '2', title: 'Male' },
                    { key: '3', title: 'Both' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};


const categories = [
    "Outdoor Activities",
    "Sports & Fitness",
    "Creative Arts",
    "Entertainment & Media",
    "Culinary Interests",
    "Social Activities",
    "Tech & Science",
    "Intellectual Pursuits",
    "Nature & Animals",
    "Miscellaneous"
];

const StepInterests = () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const flattenedInterests = React.useMemo(() => {
        return hobbiesInterests.flatMap((section, index) => [
            { type: 'header', title: categories[index] },
            ...section.map(item => ({ type: 'item', ...item }))
        ]);
    }, []);

    const handleInterestToggle = useCallback((value: string) => {
        setSelectedInterests(prevInterests => {
            if (prevInterests.includes(value)) {
                return prevInterests.filter(i => i !== value);
            } else {
                return [...prevInterests, value];
            }
        });
    }, []);

    useEffect(() => {
        useOnboardingStore.setState({ interests: selectedInterests });
        console.log('Interests:', selectedInterests);
    }, [selectedInterests]);

    const renderItem = useCallback(({ item }) => {
        if (item.type === 'header') {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{item.title}</Text>
                </View>
            );
        }

        const isSelected = selectedInterests.includes(item.value);
        return (
            <Pressable onPress={() => handleInterestToggle(item.value)}>
                <Checkbox
                    color={isSelected ? Colors.light.text : Colors.light.tertiary}
                    label={item.label}
                    value={isSelected}
                    containerStyle={[
                        defaultStyles.checkboxButton,
                        { borderColor: isSelected ? Colors.light.text : Colors.light.tertiary }
                    ]}
                    labelStyle={defaultStyles.checkboxButtonLabel}
                    onValueChange={() => handleInterestToggle(item.value)}
                />
            </Pressable>
        );
    }, [selectedInterests, handleInterestToggle]);

    return (
        <View style={styles.container}>
            <Spacer height={16} />
            <Progress percent={77} />
            <Spacer height={48} />
            <Text style={defaultStyles.h2}>Interests ({selectedInterests.length})</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>
                    This helps us find people with the same hobbies and interests.
                </Text>
            </View>
            <Spacer height={24} />
            <FlashList
                data={flattenedInterests}
                renderItem={renderItem}
                estimatedItemSize={75}
                keyExtractor={(item, index) => item.type === 'header' ? `header-${index}` : item.value}
                extraData={selectedInterests}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
};










const StepPhoto = () => {
    const { isLoading, setIsLoading } = useAppContext();
    const [avatarUrl, setAvatarUrl] = useState('');
    const session = useAuth();

    async function pixelateImage(uri: string, pixelBlocks = 15) {
        try {
            const { width, height } = await new Promise((resolve, reject) => {
                Image.getSize(uri,
                    (width, height) => resolve({ width, height }),
                    (error) => reject(error)
                );
            });

            const newWidth = pixelBlocks;
            const newHeight = Math.round((height / width) * pixelBlocks);

            const smallImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: newWidth, height: newHeight } }],
                { format: 'jpeg', compress: 1 }
            );

            const pixelatedImage = await ImageManipulator.manipulateAsync(
                smallImage.uri,
                [{ resize: { width, height } }],
                { format: 'jpeg', compress: 1 }
            );

            return pixelatedImage.uri;
        } catch (error) {
            console.error('Error in pixelateImage:', error);
            throw error;
        }
    }

    async function updateProfile({
        avatar_url,
        avatar_pixelated_url,
    }: {
        avatar_url: string;
        avatar_pixelated_url: string;
    }) {
        try {
            setIsLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                avatar_url,
                avatar_pixelated_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles_test').upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Profile Update Error', error.message);
            } else {
                Alert.alert('Profile Update Error', 'An unknown error occurred');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpload = async () => {
        try {
            setIsLoading(true);

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled || !result.assets || result.assets.length === 0) {
                setIsLoading(false);
                return;
            }

            const uri = result.assets[0].uri;
            console.log('Image picked:', uri);

            // Read the file as base64
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            if (!base64) {
                throw new Error('Failed to read image file');
            }
            console.log('Image read as base64');

            // Upload original image
            const originalPath = `${Date.now()}_original.jpg`;
            const { data: originalData, error: originalError } = await supabase.storage
                .from('avatars')
                .upload(originalPath, decode(base64), {
                    contentType: 'image/jpeg'
                });

            if (originalError) throw originalError;
            console.log('Original image uploaded');

            // Create and upload pixelated version
            const pixelatedUri = await pixelateImage(uri, 15);
            const pixelatedBase64 = await FileSystem.readAsStringAsync(pixelatedUri, { encoding: FileSystem.EncodingType.Base64 });
            if (!pixelatedBase64) {
                throw new Error('Failed to read pixelated image file');
            }
            console.log('Pixelated image created and read as base64');

            const pixelatedPath = `${Date.now()}_pixelated.jpg`;
            const { data: pixelatedData, error: pixelatedError } = await supabase.storage
                .from('avatars')
                .upload(pixelatedPath, decode(pixelatedBase64), {
                    contentType: 'image/jpeg'
                });

            if (pixelatedError) throw pixelatedError;
            console.log('Pixelated image uploaded');

            // Get public URLs
            const originalUrl = supabase.storage.from('avatars').getPublicUrl(originalData.path).data.publicUrl;
            const pixelatedUrl = supabase.storage.from('avatars').getPublicUrl(pixelatedData.path).data.publicUrl;

            // Update profile
            await updateProfile({ avatar_url: originalUrl, avatar_pixelated_url: pixelatedUrl });

            setAvatarUrl(originalUrl);
            useOnboardingStore.setState({ photoUploaded: true });
            console.log('Profile updated successfully');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Upload Error', error.message);
            } else {
                Alert.alert('Upload Error', 'An unknown error occurred');
            }
            console.error('Error in handleUpload:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to decode base64
    function decode(base64: string) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let bufferLength = base64.length * 0.75,
            length = base64.length, i, p = 0,
            encoded1, encoded2, encoded3, encoded4;

        const bytes = new Uint8Array(bufferLength);

        for (i = 0; i < length; i += 4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i + 1]);
            encoded3 = chars.indexOf(base64[i + 2]);
            encoded4 = chars.indexOf(base64[i + 3]);

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }

        return bytes.buffer;
    }

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />
            <Progress percent={88} />
            <Spacer height={48} />
            <Text style={defaultStyles.h2}>Your Photo</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>
                    You can only add one. So, make it count :)
                </Text>
            </View>
            <Spacer height={24} />
            <View style={styles.avatarContainer}>
                {avatarUrl ? (
                    <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatar}
                    />
                ) : (
                    <TouchableOpacity onPress={handleUpload} disabled={isLoading}>
                        <View style={styles.placeholderAvatar}>
                            <Text>{isLoading ? 'Uploading...' : 'Tap to upload'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};








const StepFinal = () => {
    const navigation = useNavigation();
    const { showOnboarding, setShowOnboarding } = useAppContext();


    const [relationshipType] = useOnboardingStore(
        useShallow((state) => [state.relationship]),
    )
    console.log('relationshipType', relationshipType)

    let subHeading = `Since you chose to look for a relationship, “Dive mode” was automatically activated.`
    if (relationshipType == 2) {
        subHeading = `Since you chose to look for friendship, "Dive mode" was automatically activated. You can change this in your settings.`
    } else if (relationshipType == 3) {
        subHeading = `Since you are looking for a hookup, “Surf mode” has been activated.`
    }

    const finalSlidesContent = [
        {
            id: 1,
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding3.png'),
        },
        {
            id: 2,
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding4.png'),
        },
    ]




    interface OnboardingItem {
        id: number;
        title: string;
        description: string;
        image: ImageSourcePropType;
    }

    const { width } = useWindowDimensions();

    function renderItem({ item }: { item: OnboardingItem }) {
        return (
            <View className='' >
                <Image source={item.image} style={{ width }} />
            </View >
        )

    }


    const scrollX = useRef(new Animated.Value(0)).current;

    const Pagination = ({ count }: { count: number }) => {
        return (
            <View className='flex-row justify-center'>
                {Array(count).fill(0).map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#cccccc', '#7A37D0', '#cccccc'],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={index}
                            className='w-2 h-2 mx-1 rounded-full'
                            style={{ backgroundColor: dotColor }}
                        />
                    );
                })}
            </View>
        );
    };

    const handleDone = async () => {
        useOnboardingStore.setState({ dataUploaded: true, onboardingCompleted: true });

        console.log('onboarding done, saving it in storage');
        await storeData('onboardingComplete', true);
        setShowOnboarding(false)
    }



    return (
        <View className='w-screen flex justify-between h-full bg-white'>
            <View className='flex just'>
                <View className='p-6 pb-0'>
                    <Spacer height={24} />
                    <Text style={defaultStyles.h2}>You are all set!</Text>
                    <Spacer height={8} />
                    <Text style={defaultStyles.body}>{subHeading}</Text>
                </View>
                <FlatList
                    data={finalSlidesContent}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
                <Pagination count={finalSlidesContent.length} />
            </View>
            <View className='p-6'>
                <Button onPress={handleDone} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                    <Text style={defaultStyles.buttonLabel}>Got it</Text>
                </Button>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
    },
    listContentContainer: {
        paddingBottom: 16,
    },
    sectionHeader: {
        backgroundColor: Colors.light.background,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.tertiary,
        width: '100%',
    },
    sectionHeaderText: {
        fontFamily: 'HeadingBold',
        fontSize: 18,
        color: Colors.light.accent,
    },
    checkboxContainer: {
        width: '100%',
        paddingVertical: 8,
    },
    checkbox: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        backgroundColor: Colors.light.background,
    },
    checkboxLabel: {
        fontFamily: 'BodyRegular',
        fontSize: 16,
        color: Colors.light.text,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 8,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 200,
        height: 300,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    placeholderAvatar: {
        width: 200,
        height: 300,
        borderRadius: 16,
        backgroundColor: Colors.light.backgroundSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
    },
});




```

# app\loading.tsx

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function History() {
    return (
        <View>
            <Text>LOADING...</Text>
        </View>
    );
}
```

# app\index.tsx

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';
// check if crashes in production https://reactnavigation.org/docs/stack-navigator/

import { Slot, SplashScreen } from 'expo-router';
import RootNavigator from '@/components/RootNavigator';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
// import { MMKV } from 'react-native-mmkv'
import hobbiesInterests from '@/constants/Interests'
import { useNotifications } from '@/hooks/useNotifications';
import { clearAllStorage, getData, storeData, resetUserSearchFilters } from '@/utils/storage';
import { AppProvider, useAppContext } from '@/providers/AppProvider';
import { supabase } from '@/lib/supabase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const chatClient = StreamChat.getInstance('pcvjbntz7tfy');



if (Platform.OS != 'ios') {
    NavigationBar.setBackgroundColorAsync('white');
}




export default function RootLayout() {
    const session = useAuth();
    const [onboardingDone, setOnboardingDone] = useState(false);
    // const { expoPushToken, notification, matchNotifications } = useNotifications();
    const [loaded, error] = useFonts({
        HeadingBold: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
        HeadingRegular: require('@/assets/fonts/RobotoSlab-Regular.ttf'),
        HeadingMedium: require('@/assets/fonts/RobotoSlab-Medium.ttf'),
        HeadingLight: require('@/assets/fonts/RobotoSlab-Light.ttf'),
        BodyBold: require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
        BodySemiBold: require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        BodyRegular: require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
        BodyMedium: require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
        BodyLight: require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
        CopperBook: require('@/assets/fonts/Copernicus-Book.ttf'),
        CopperBold: require('@/assets/fonts/Copernicus-Bold.ttf'),
        CopperExtraBold: require('@/assets/fonts/Copernicus-Extrabold.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    





    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();

            // clearAllStorage()
            // return;

            getData('genderPreference').then(genderPreference => {
                if (genderPreference === undefined) {
                    console.log('no search preferences found, resetting')
                    resetUserSearchFilters()
                } else {
                    console.log('search preferences found', genderPreference)
                }
            })

        }
    }, [loaded]);


    // useEffect(() => {
    //     if (matchNotifications.length > 0) {
    //         console.log('You have new matches!', matchNotifications);
    //         // Here you can update UI, show a notification, etc.
    //     }
    // }, [matchNotifications]);


    if (!loaded) {
        return null;
    }


    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AppProvider>
                    <OverlayProvider>
                        <Chat client={chatClient}>
                            {/* <NavigationContainer> */}
                                <RootNavigator
                                    session={session}
                                />
                            {/* </NavigationContainer> */}
                        </Chat>
                    </OverlayProvider>
                </AppProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

```

# api\supabaseApi.ts

```ts
import { supabase } from '@/lib/supabase';

export const api = {
  
  getCurrentUserProfile: async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles_test')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching current user profile:', error);
        throw error;
    }
    console.log('Current User Profile Data:', data);
    return data;
},


  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles_test')
      .upsert({ id: userId, ...updates })
      .select();
    
    if (error) throw error;
    return data;
  },

  getPotentialMatches: async (userId: string, limit: number) => {
    const { data, error } = await supabase.rpc('get_potential_matches', {
      user_id: userId,
      limit_count: limit,
    });
    
    if (error) throw error;
    return data;
  },


  getProfileDetails: async (userId: string) => {
    const { data, error } = await supabase
        .from('profile_details')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
    console.log('Profile Details Data:', data);
    return data;
},

getPotentialDiveMatches: async (userId: string, limit: number) => {
  const { data, error } = await supabase.rpc('get_potential_dive_matches', {
      user_id: userId,
      limit_count: limit,
  });
  
  if (error) {
      console.error('Error fetching potential dive matches:', error);
      throw error;
  }
  console.log('Potential Dive Matches Data:', data);
  return data;
},

  recordMatchAction: async (userId: string, matchedUserId: string, action: 'like' | 'dislike') => {
    const { data, error } = await supabase
      .rpc('handle_match_action', { 
        acting_user_id: userId, 
        target_user_id: matchedUserId,
        match_action: action === 'like' ? 1 : 0,
      });
    
    if (error) {
      console.error('Error in handle_match_action:', error);
    } else {
      console.log('Match action handled, is new match:', data);
    }
  },




};
```

# api\auth.ts

```ts
import { supabase } from '@/lib/supabase';

export async function fetchStreamToken(userId: string): Promise<string> {
  try {
    console.log("Fetching Stream token for user:", userId);
    const { data, error } = await supabase.functions.invoke('generate-stream-token', {
      body: { user: { id: userId } },
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw error;
    }
    if (!data || !data.token) {
      console.error("No token received. Data:", data);
      throw new Error('No token received');
    }

    console.log("Stream token fetched successfully");
    return data.token;
  } catch (error) {
    console.error('Error fetching Stream token:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', await error.response.text());
    }
    throw error;
  }
}


/*
usage in component:


import { fetchStreamToken } from '@/api/auth';

// In your component or hook
useEffect(() => {
  const getStreamToken = async () => {
    try {
      const token = await fetchStreamToken(userId);
      console.log("Received token:", token);
      // Use the token here
    } catch (error) {
      console.error("Error getting stream token:", error);
    }
  };

  getStreamToken();
}, [userId]);
*/
```

# scripts\sql\current sql setup.txt

```txt
CREATE OR REPLACE FUNCTION get_potential_matches(user_id UUID, limit_count INT) 
RETURNS TABLE (
    id UUID,
    name TEXT,
    age SMALLINT,
    gender SMALLINT,
    avatar_url TEXT,
    interests SMALLINT[]
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        p.id,
        p.name,
        p.age,
        p.gender,
        p.avatar_url,
        p.interests
    FROM profiles_test p
    WHERE p.id != get_potential_matches.user_id
    -- AND p.gender = (SELECT gender_preference FROM profiles_test WHERE id = get_potential_matches.user_id)
    -- AND NOT EXISTS (
    --     SELECT 1 
    --     FROM matches m 
    --     WHERE (m.user1_id = get_potential_matches.user_id AND m.user2_id = p.id) 
    --        OR (m.user2_id = get_potential_matches.user_id AND m.user1_id = p.id)
    -- )
    ORDER BY p.last_active DESC
    LIMIT get_potential_matches.limit_count;
END;
$$ LANGUAGE plpgsql;
```

# supabase\.temp\cli-latest

```
v1.187.3
```

# components\__tests__\ThemedText-test.tsx

```tsx
import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});

```

# components\tabs\surf.tsx

```tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import { Chip, Fader } from 'react-native-ui-lib';
import TypewriterEffect from '@/components/CrushyTypewriterEffect';
import { useNavigation, StackActions } from '@react-navigation/native';
import { usePotentialMatches, useProfile } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export default function Surf() {
    const session = useAuth();
    const { matches: potentialMatches, loading, error, fetchMatches, recordAction } = usePotentialMatches();
    const { currentUserProfile, fetchCurrentUserProfile } = useProfile();
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | number>(require('@/assets/images/react-logo.png'));
    const navigation = useNavigation();
    const typewriterKey = useRef(0);

    useEffect(() => {
        if (session?.user?.id) {
            fetchMatches();
            fetchCurrentUserProfile();
        }
    }, [session, fetchMatches, fetchCurrentUserProfile]);

    useEffect(() => {
        const currentMatch = potentialMatches[currentMatchIndex];
        if (currentMatch?.avatar_url) {
            setImageUrl(currentMatch.avatar_url);
        } else {
            setImageUrl(require('@/assets/images/react-logo.png'));
        }
    }, [currentMatchIndex, potentialMatches]);

    const currentMatch = potentialMatches[currentMatchIndex];

    const handleAction = useCallback(async (action: 'like' | 'dislike') => {
        if (!session?.user?.id || !currentMatch) return;

        try {
            await recordAction(currentMatch.id, action);

            if (action === 'like') {
                const isMatch = await checkForMatch(session.user.id, currentMatch.id);
                if (isMatch) {
                    Alert.alert(
                        "It's a Match!",
                        `You and ${currentMatch.name} have liked each other!`,
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                }
            }

            moveToNextMatch();
        } catch (error) {
            console.error('Error in handleAction:', error);
        }
    }, [session, currentMatch, recordAction]);

    const moveToNextMatch = useCallback(() => {
        if (currentMatchIndex < potentialMatches.length - 1) {
            setCurrentMatchIndex(prevIndex => prevIndex + 1);
        } else {
            fetchMatches();
            setCurrentMatchIndex(0);
        }

        typewriterKey.current += 1;
    }, [currentMatchIndex, potentialMatches.length, fetchMatches]);

    const handleLike = () => handleAction('like');
    const handleDislike = () => handleAction('dislike');

    const checkForMatch = async (currentUserId: string, likedUserId: string) => {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('user1_id', likedUserId)
            .eq('user2_id', currentUserId)
            .eq('user1_action', 1);

        if (error && error.code !== 'PGRST116') {
            console.error('Error checking for match:', error);
            return false;
        }

        return data && data.length > 0;
    };

    const renderInterestChips = useCallback(() => {
        if (!currentMatch || !currentUserProfile?.interests) return null;

        const sortedInterests = [...currentMatch.interests].sort((a, b) => {
            const aIsShared = currentUserProfile.interests.includes(a);
            const bIsShared = currentUserProfile.interests.includes(b);
            if (aIsShared && !bIsShared) return -1;
            if (!aIsShared && bIsShared) return 1;
            return 0;
        });

        return sortedInterests.map((interestId, index) => {
            const interestObject = hobbiesInterests.flat().find(item => item.value === interestId.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interestId}`);
                return null;
            }

            const isLast = index === sortedInterests.length - 1;
            const isShared = currentUserProfile.interests.includes(interestId);

            return (
                <Chip
                    key={`${currentMatch.id}-${interestId}`}
                    label={interestObject.label}
                    labelStyle={[styles.chipLabel, isShared && styles.sharedChipLabel]}
                    containerStyle={[
                        styles.chip,
                        isShared && styles.sharedChip,
                        isLast && { marginRight: 32 }
                    ]}
                    iconSource={isShared ? require('@/assets/images/icons/iconSharedInterest.png') : null}
                />
            );
        });
    }, [currentMatch, currentUserProfile]);

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>An error occurred. Please try again later.</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentMatch) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.noMatchesContainer}>
                    <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                    <Text style={styles.noMatchesTitle}>You've reached the end</Text>
                    <Text style={styles.noMatchesText}>No more potential matches to show.</Text>
                    <Text style={styles.noMatchesText}>Adjust search filters, or check back later.</Text>
                    <Spacer height={40} />
                    <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                        <Text style={styles.buttonFilterText}>Search Filters</Text>
                    </Pressable>
                    <Spacer height={40} />
                    <Pressable onPress={() => { navigation.dispatch(StackActions.popToTop()) }}>
                        <Text style={styles.refreshText}>Back Home</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                            <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                            <Text style={styles.buttonFilterText}>Search Filters</Text>
                        </Pressable>

                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.goBack() }}>
                            <Image source={require('@/assets/images/icons/tab-home.png')} style={{ width: 32, aspectRatio: '1' }} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.personContainer}>
                    <Image
                        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                        style={styles.person}
                        onError={() => {
                            console.log('Error loading image, setting default');
                            setImageUrl(require('@/assets/images/react-logo.png'));
                        }}
                    />

                    <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={222} />

                    {!loading && (
                        <View style={{ width: '78%' }}>
                            <View style={styles.personInfo}>
                                <TypewriterEffect
                                    key={typewriterKey.current}
                                    text={currentMatch.name + ', ' + currentMatch.age.toString()}
                                    style={styles.personName}
                                    delay={12}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit={true}
                                />
                            </View>
                        </View>
                    )}

                    <ScrollView horizontal style={styles.chipsContainer} showsHorizontalScrollIndicator={false}>
                        {renderInterestChips()}
                    </ScrollView>

                    <Pressable onPress={() => { navigation.navigate('Profile', { id: currentMatch.id, imageUrl: imageUrl }) }} style={[styles.buttonExpand, defaultStyles.buttonShadow]}>
                        <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={styles.buttonsMatching}>
                    <Pressable onPress={handleDislike} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={handleLike} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { alert("This feature will be available in the future.") }} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>

                {loading && <ActivityIndicator size="small" color={Colors.light.accent} style={styles.loader} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        width: '100%',
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 96,
        resizeMode: 'contain'
    },
    buttonFilter: {
        backgroundColor: Colors.light.white,
        paddingBottom: 2,
        paddingHorizontal: 12,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 32,
        gap: 4,
    },
    buttonFilterText: {
        fontSize: 14,
        fontFamily: 'BodyRegular',
        color: Colors.light.text,
    },
    personContainer: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    person: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: Colors.light.backgroundSecondary,
    },

    loader: {
        position: 'absolute',
        top: 8,
        left: 16,
        zIndex: 5,
    },
    personInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        position: 'absolute',
        bottom: 64,
        left: 16,
    },
    personName: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.white,
    },
    personAge: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.white,
        opacity: 0.7
    },
    chipsContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 16,
        paddingHorizontal: 16,
    },
    chip: {
        backgroundColor: Colors.light.white,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 8,
        borderRadius: 99,
        borderWidth: 0,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    buttonClose: {
        backgroundColor: Colors.light.white,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.black,
        position: 'absolute',
        top: 16,
        right: 16,
    },
    buttonExpand: {
        backgroundColor: Colors.light.white,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.black,
        position: 'absolute',
        bottom: 68,
        right: 16,
    },
    buttonsMatching: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    buttonsMatchingPrimary: {
        maxWidth: 90,
        maxHeight: 90,
    },
    buttonsMatchingSecondary: {
        maxWidth: 80,
        maxHeight: 80,
        marginHorizontal: 16,
    },
    noMatchesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMatchesTitle: {
        fontFamily: 'HeadingBold',
        fontSize: 24,
        color: Colors.light.text,
        marginTop: 16,
    },
    noMatchesText: {
        fontFamily: 'BodyRegular',
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 22,
    },
    refreshText: {
        fontFamily: 'BodySemiBold',
        fontSize: 18,
        color: Colors.light.accent,
    },
    sharedChip: {
        paddingLeft: 12,
        backgroundColor: Colors.light.white,
    },
    sharedChipLabel: {
        color: Colors.light.text,
    },
});

```

# components\tabs\me.tsx

```tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { StyleSheet, View, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '@/components/Avatar'


export default function Me() {
    const session = useAuth();
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (session?.user) getProfile()
    }, [session])

    async function getProfile() {
        console.log('getProfile')
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles_test')
                .select('*')
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }
            console.log("🚀 ~ getProfile ~ data:", data)
            if (data) {
                setName(data.name)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        name,
        avatar_url,
    }: {
        name: string
        avatar_url: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                name,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles_test').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <View style={styles.inner}>
                    <ScrollView style={styles.container}>
                        <View>
                            <Avatar
                                size={80}
                                url={avatarUrl}
                                onUpload={(url: string) => {
                                    setAvatarUrl(url)
                                    updateProfile({ name, avatar_url: url })
                                }}
                            />
                        </View>
                        <View style={[styles.verticallySpaced, styles.mt20]}>
                            <Input label="Email" value={session?.user?.email} disabled />
                        </View>
                        <View style={styles.verticallySpaced}>
                            <Input label="Name" value={name || ''} onChangeText={(text) => setName(text)} />
                        </View>
                        <View style={[styles.verticallySpaced, styles.mt20]}>
                            <Button
                                title={loading ? 'Loading ...' : 'Update'}
                                onPress={() => updateProfile({ name, avatar_url: avatarUrl })}
                                disabled={loading}
                            />
                        </View>
                        <View style={styles.verticallySpaced}>
                            <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})
```

# components\tabs\inbox.tsx

```tsx
// components/tabs/inbox.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

type Match = {
    id: string;
    name: string;
    avatar_url: string;
};

export default function Inbox() {
    // const [matches, setMatches] = useState<Match[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const navigation = useNavigation();
    // const session = useAuth();

    // useEffect(() => {
    //     if (session?.user) {
    //         fetchMatches();
    //     }
    // }, [session]);

    // const fetchMatches = async () => {
    //     try {
    //         setLoading(true);
    //         const { data, error } = await supabase
    //             .from('matches')
    //             .select(`
    //                 id,
    //                 matched_at,
    //                 profiles_test!matches_user2_id_fkey (
    //                     id,
    //                     name,
    //                     avatar_url
    //                 )
    //                 `)
    //             .eq('user1_id', session?.user.id)

    //         //.not('matched_at', 'is', null);

    //         if (error) throw error;

    //         setMatches(data.map((match: any) => ({
    //             id: match.profiles_test.id,
    //             name: match.profiles_test.name,
    //             avatar_url: match.profiles_test.avatar_url,
    //             matched_at: match.matched_at
    //         })));
    //     } catch (error) {
    //         console.error('Error fetching matches:', error);
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const renderMatch = ({ item }: { item: Match }) => (
    //     <Pressable
    //         style={styles.matchItem}
    //         onPress={() => navigation.navigate('Chat', { matchId: item.id, matchName: item.name })}
    //     >
    //         <Text style={styles.matchName}>{item.name}</Text>
    //     </Pressable>
    // );

    // if (loading) {
    //     return (
    //         <SafeAreaView style={defaultStyles.SafeAreaView}>
    //             <View style={styles.centerContainer}>
    //                 <ActivityIndicator size="large" />
    //             </View>
    //         </SafeAreaView>
    //     );
    // }

    // if (error) {
    //     return (
    //         <SafeAreaView style={defaultStyles.SafeAreaView}>
    //             <View style={styles.centerContainer}>
    //                 <Text style={styles.errorText}>Error: {error}</Text>
    //             </View>
    //         </SafeAreaView>
    //     );
    // }

    // return (
    //     <SafeAreaView style={defaultStyles.SafeAreaView}>
    //         <View style={defaultStyles.innerContainer}>
    //             <Text style={defaultStyles.h2}>Inbox</Text>
    //             {matches.length > 0 ? (
    //                 <FlatList
    //                     data={matches}
    //                     renderItem={renderMatch}
    //                     keyExtractor={(item) => item.id}
    //                 />
    //             ) : (
    //                 <Text style={styles.noMatchesText}>No matches yet</Text>
    //             )}
    //         </View>
    //     </SafeAreaView>
    // );
}

const styles = StyleSheet.create({
    matchItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.tertiary,
    },
    matchName: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    noMatchesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
```

# components\tabs\home.tsx

```tsx
import { supabase } from '@/lib/supabase';
import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const session = useAuth();
    let showOnboarding = useProfile(session);

    if (showOnboarding) {
        // router.replace('/onboarding')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Text>Home Screen</Text>
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </SafeAreaView>
    );
}
```

# components\tabs\history.tsx

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>History Screen</Text>
            </View>
        </SafeAreaView>
    );
}
```

# components\tabs\explore.tsx

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Explore() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Explore Screen</Text>
      </View>
    </SafeAreaView>
  );
}
```

# components\tabs\dive.tsx

```tsx
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import { Chip } from 'react-native-ui-lib';
import { useNavigation, StackActions } from '@react-navigation/native';
import { usePotentialMatches, useProfile } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';


interface PotentialMatch {
    id: string;
    name: string;
    age: number;
    gender: number;
    avatar_pixelated_url: string;
    interests: number[];
}

export default function Dive() {
    const session = useAuth();
    const navigation = useNavigation();
    const { matches: potentialMatches, loading, error, fetchDiveMatches, recordAction } = usePotentialMatches();
    const { currentUserProfile, loading: profileLoading, error: profileError, fetchCurrentUserProfile, fetchProfileDetails } = useProfile();
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | number>(require('@/assets/images/react-logo.png'));
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentMatchProfile, setCurrentMatchProfile] = useState(null);

    const currentMatch = potentialMatches[currentMatchIndex];

    const interestsList = useMemo(() => hobbiesInterests.flat(), []);

    useEffect(() => {
        if (session?.user?.id) {
            fetchDiveMatches();
            fetchCurrentUserProfile();
        }
    }, [session, fetchDiveMatches, fetchCurrentUserProfile]);

    useEffect(() => {
        if (currentMatch?.id) {
            fetchProfileDetails(currentMatch.id).then(setCurrentMatchProfile);
        }
    }, [currentMatch, fetchProfileDetails]);

    useEffect(() => {
        console.log('Current Match:', currentMatch);
        console.log('Current User Profile:', currentUserProfile);
        console.log('Current Match Profile:', currentMatchProfile);
    }, [currentMatch, currentUserProfile, currentMatchProfile]);


    useEffect(() => {
        if (currentMatch?.avatar_pixelated_url) {
            setImageUrl(currentMatch.avatar_pixelated_url);
        } else {
            setImageUrl(require('@/assets/images/react-logo.png'));
        }
    }, [currentMatch]);




    const checkForMatch = useCallback(async (currentUserId: string, likedUserId: string) => {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('user1_id', likedUserId)
            .eq('user2_id', currentUserId)
            .eq('user1_action', 1);

        if (error && error.code !== 'PGRST116') {
            console.error('Error checking for match:', error);
            return false;
        }

        return data && data.length > 0;
    }, []);



    const handleAction = useCallback(async (action: 'like' | 'dislike') => {
        if (!session?.user?.id || !currentMatch) return;

        scrollToTop();

        try {
            await recordAction(currentMatch.id, action);

            if (action === 'like') {
                const isMatch = await checkForMatch(session.user.id, currentMatch.id);
                if (isMatch) {
                    Alert.alert(
                        "It's a Match!",
                        `You and ${currentMatch.name} have liked each other!`,
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                }
            }

            // Move to next match
            if (currentMatchIndex < potentialMatches.length - 1) {
                setCurrentMatchIndex(prevIndex => prevIndex + 1);
            } else {
                // Fetch new matches if we've reached the end
                await fetchDiveMatches();
                setCurrentMatchIndex(0);
            }

        } catch (error) {
            console.error('Error in handleAction:', error);
        }
    }, [session, currentMatch, recordAction, checkForMatch]);



    const renderInterestChips = useCallback((type: string) => {
        console.log('Rendering Interest Chips:', type);
        console.log('Current Match Interests:', currentMatch?.interests);
        console.log('Current User Interests:', currentUserProfile?.interests);

        if (!currentMatch?.interests || !currentUserProfile?.interests) {
            console.log('Interests not available');
            return null;
        }

        const matchInterests = currentMatch.interests;
        const userInterests = currentUserProfile.interests;

        const sortedInterests = [...matchInterests].sort((a: number, b: number) => {
            const aIncluded = userInterests.includes(a);
            const bIncluded = userInterests.includes(b);
            if (aIncluded && !bIncluded) return -1;
            if (!aIncluded && bIncluded) return 1;
            return 0;
        });

        return sortedInterests.map((interest: number, index: number) => {
            const interestObject = interestsList.find(item => parseInt(item.value) === interest);
            if (!interestObject) return null;

            const isShared = userInterests.includes(interest);
            if (type === 'shared' && isShared) {
                return (
                    <Chip
                        key={index}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel, styles.sharedChipLabel]}
                        containerStyle={[styles.chip, styles.sharedChip]}
                        iconSource={require('@/assets/images/icons/iconSharedInterest.png')}
                    />
                );
            } else if (type !== 'shared' && !isShared) {
                return (
                    <Chip
                        key={index}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel]}
                        containerStyle={[styles.chip]}
                    />
                );
            }
            return null;
        });
    }, [currentMatch, currentUserProfile, interestsList]);


    const unescapeText = useCallback((text: string) => {
        return text
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\\\/g, '\\');
    }, []);

    const scrollToTop = useCallback(() => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }, []);

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>An error occurred. Please try again later. {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentMatch) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.noMatchesContainer}>
                    <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                    <Text style={styles.noMatchesTitle}>You've reached the end</Text>
                    <Text style={styles.noMatchesText}>No more potential matches to show.</Text>
                    <Text style={styles.noMatchesText}>Adjust search filters, or check back later.</Text>
                    <Spacer height={40} />
                    <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                        <Text style={styles.buttonFilterText}>Search Filters</Text>
                    </Pressable>
                    <Spacer height={40} />
                    <Pressable onPress={() => { navigation.dispatch(StackActions.popToTop()) }}>
                        <Text style={styles.refreshText}>Back Home</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <ActivityIndicator size="small" color={Colors.light.accent} style={styles.loader} />}

            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                            <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                            <Text style={styles.buttonFilterText}>Search Filters</Text>
                        </Pressable>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.goBack() }}>
                            <Image source={require('@/assets/images/icons/tab-home.png')} style={{ width: 32, aspectRatio: 1 }} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.pageContent}>
                <View style={styles.personContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                            style={styles.person}
                            onError={() => setImageUrl(require('@/assets/images/react-logo.png'))}
                        />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <View style={styles.personInfo}>
                            <Text style={styles.personName}>{!loading ? `${currentMatch.name}, ${currentMatch.age}` : '...'}</Text>
                        </View>
                    </View>

                    {currentMatch?.interests?.length > 0 && currentUserProfile?.interests?.length > 0 && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Spacer height={32} />
                            <Text style={styles.sectionTitle}>Shared Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('shared')}
                            </View>
                        </View>
                    )}

                    <Spacer height={32} />

                    {currentMatchProfile?.bio && (
                        <View>
                            <View style={{ paddingHorizontal: 16 }}>
                                <Text style={styles.sectionTitle}>Bio</Text>
                                <Spacer height={8} />
                                <Text style={styles.bioText}>{unescapeText(currentMatchProfile.bio)}</Text>
                            </View>
                            <Spacer height={32} />
                        </View>
                    )}


                    {currentMatch?.interests?.length > 0 && currentUserProfile?.interests?.length > 0 && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Spacer height={32} />
                            <Text style={styles.sectionTitle}>Shared Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('')}
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.buttonsMatching}>
                    <Pressable onPress={() => handleAction('dislike')} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={() => handleAction('like')} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { alert("This feature will be available in the future.") }} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    pageContent: {

    },
    header: {
        width: '100%',
        marginTop: 16,
        marginBottom: 0,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.light.tertiary,
    },
    logo: {
        width: 96,
        resizeMode: 'contain'
    },
    buttonFilter: {
        backgroundColor: Colors.light.white,
        paddingBottom: 2,
        paddingHorizontal: 12,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 32,
        gap: 4,
    },
    buttonFilterText: {
        fontSize: 14,
        fontFamily: 'BodyRegular',
        color: Colors.light.text,
    },
    personContainer: {
        // flex: 1,
        marginTop: 32,
    },
    person: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 80,
        backgroundColor: Colors.light.tertiary,
    },
    loader: {
        position: 'absolute',
        top: 8,
        left: 16,
        zIndex: 5,
    },
    personInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    personName: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.text,
    },
    personAge: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.text,
        opacity: 0.7
    },
    chipsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        rowGap: 8,
    },
    chip: {
        backgroundColor: Colors.light.white,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 8,
        borderRadius: 99,
        shadowColor: Colors.light.black,
    },
    sharedChip: {
        paddingLeft: 12,
        backgroundColor: Colors.light.white,
    },
    sharedChipLabel: {
        color: Colors.light.text,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    buttonsMatching: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 16,
    },
    buttonsMatchingPrimary: {
        maxWidth: 90,
        maxHeight: 90,
    },
    buttonsMatchingSecondary: {
        maxWidth: 80,
        maxHeight: 80,
        marginHorizontal: 16,
    },
    noMatchesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMatchesTitle: {
        fontFamily: 'HeadingBold',
        fontSize: 24,
        color: Colors.light.text,
        marginTop: 16,
    },
    noMatchesText: {
        fontFamily: 'BodyRegular',
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 22,
    },
    refreshText: {
        fontFamily: 'BodySemiBold',
        fontSize: 18,
        color: Colors.light.accent,
    },
    sectionTitle: {
        fontFamily: 'HeadingBold',
        fontSize: 22,
        color: Colors.light.text,
        marginTop: 16,
    },
    bioText: {
        fontFamily: 'BodyRegular',
        fontSize: 18,
        lineHeight: 26,
    },
});

```

# components\ui\Textfields.tsx

```tsx

import { TextInput } from 'react-native';
import { styled } from 'nativewind';

const Textfield = styled(TextInput, 'w-full radius-4 text-lg bg-gray-100 p-2 rounded-lg h-12 border-2 border-gray-200');


export { Textfield }
```

# components\ui\Containers.tsx

```tsx

import { View } from 'react-native';
import { styled } from 'nativewind';

const Pageview = styled(View, 'p-6');


export { Pageview }


```

# components\ui\Buttons.tsx

```tsx

import { Text, Button } from 'react-native-ui-lib';
import { styled } from 'nativewind';

const PrimaryButton = styled(Button, 'w-full h-12 rounded-lg justify-center bg-primary-600 border-2 border-primary-400 shadow active:shadow-none');
const PrimaryButtonText = styled(Text, 'uppercase text-center text-white font-bold');

const SecondaryButton = styled(Button, 'w-full h-12 rounded-lg justify-center bg-white border-2 border-primary-200 shadow active:shadow-none');
const SecondaryButtonText = styled(Text, 'uppercase text-center text-primary-700 font-bold');


export { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText }
```

# components\onboarding\StepInterests.tsx

```tsx
import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Checkbox } from 'react-native-ui-lib';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import hobbiesInterests from '@/constants/Interests';
import Spacer from '@/components/Spacer';

const StepInterests = ({ onInterestsSelected }) => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const flattenedInterests = React.useMemo(() => hobbiesInterests.flat(), []);

    const handleInterestToggle = useCallback((interest: string) => {
        setSelectedInterests(prevInterests => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter(i => i !== interest);
            } else {
                return [...prevInterests, interest];
            }
        });
    }, []);

    useEffect(() => {
        onInterestsSelected(selectedInterests);
    }, [selectedInterests, onInterestsSelected]);

    const renderItem = useCallback(({ item }) => (
        <Pressable onPress={() => handleInterestToggle(item.value)}>
            <Checkbox
                color={selectedInterests.includes(item.value) ? Colors.light.text : Colors.light.tertiary}
                label={item.label}
                value={selectedInterests.includes(item.value)}
                containerStyle={[defaultStyles.checkboxButton, { borderColor: selectedInterests.includes(item.value) ? Colors.light.text : Colors.light.tertiary }]}
                labelStyle={defaultStyles.checkboxButtonLabel}
                onValueChange={() => handleInterestToggle(item.value)}
            />
        </Pressable>
    ), [selectedInterests, handleInterestToggle]);

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.h2}>Interests ({selectedInterests.length})</Text>
            <Spacer height={8} />
            <Text style={defaultStyles.body}>
                This helps us find people with the same hobbies and interests.
            </Text>
            <Spacer height={24} />
            <FlashList
                data={flattenedInterests}
                renderItem={renderItem}
                estimatedItemSize={75}
                keyExtractor={(item) => item.value}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default StepInterests;
```

# assets\sounds\notification.wav

This is a binary file of the type: Binary

# components\navigation\TabBarIcon.tsx

```tsx
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

```

# assets\images\splash.png

This is a binary file of the type: Image

# assets\images\react-logo@3x.png

This is a binary file of the type: Image

# assets\images\react-logo@2x.png

This is a binary file of the type: Image

# assets\images\react-logo.png

This is a binary file of the type: Image

# assets\images\partial-react-logo.png

This is a binary file of the type: Image

# assets\images\icon.png

This is a binary file of the type: Image

# assets\images\favicon.png

This is a binary file of the type: Image

# assets\images\adaptive-icon.png

This is a binary file of the type: Image

# assets\fonts\RobotoSlab-Thin.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-SemiBold.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-Regular.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-Medium.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-Light.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-ExtraLight.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-ExtraBold.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-Bold.ttf

This is a binary file of the type: Binary

# assets\fonts\RobotoSlab-Black.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-SemiBoldItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-SemiBold.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-Regular.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-MediumItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-Medium.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-LightItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-Light.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-Italic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-ExtraLightItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-ExtraLight.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-ExtraBoldItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-ExtraBold.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-BoldItalic.ttf

This is a binary file of the type: Binary

# assets\fonts\PlusJakartaSans-Bold.ttf

This is a binary file of the type: Binary

# assets\fonts\Copernicus-Extrabold.ttf

This is a binary file of the type: Binary

# assets\fonts\Copernicus-Book.ttf

This is a binary file of the type: Binary

# assets\fonts\Copernicus-Bold.ttf

This is a binary file of the type: Binary

# app\searchFilters\index.tsx

```tsx
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { Button, Card, ListItem } from 'react-native-ui-lib'
import Spacer from '@/components/Spacer'
import { useFocusEffect } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import { getData, resetUserSearchFilters } from '@/utils/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppContext } from '@/providers/AppProvider'
import { useNavigation } from '@react-navigation/native'

export default function SearchFilters() {
    const { searchFilters, setSearchFilters, resetFilters } = useAppContext();
    const navigation = useNavigation();

    const getMultiple = async () => {
        try {
            const values = await AsyncStorage.multiGet(['genderPreference', 'ageRange', 'distance', 'starSignPreference',
                'bodyTypePreference', 'exerciseFrequency', 'smokingFrequency', 'drinkingFrequency', 'cannabisFrequency', 'dietPreference']);

            const newFilters = { ...searchFilters };
            values.forEach(([key, value]) => {
                if (value) {
                    newFilters[key] = JSON.parse(value);
                }
            });
            console.log('newFilters', newFilters);
            setSearchFilters(newFilters);
        } catch (e) {
            console.error('Error reading values', e);
        }
    }

    const resetSettings = async () => {
        await resetUserSearchFilters()
        resetFilters();
        getMultiple();
    }

    useFocusEffect(
        useCallback(() => {
            getMultiple()
        }, [])
    );

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Card onPress={() => console.log('pressed me')} enableShadow={false} style={{ display: 'flex', height: 60, alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters</Text>
                </Card>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Button onPress={() => navigation.navigate('filterGenderPreference')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.firstItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Gender</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
                            {
                                searchFilters.genderPreference.value.length === 0 ? '-' :
                                    searchFilters.genderPreference.value.length === 1 ? searchFilters.genderPreference.value[0] :
                                        searchFilters.genderPreference.value[0] + ' +' + (searchFilters.genderPreference.value.length - 1)
                            }
                        </Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterAgeRange')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Age Range</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.ageRange.min}-{searchFilters.ageRange.max}</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.lastItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Distance</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.distance.value} km</Text>
                    </Button>
                    <Spacer height={32} />
                    <Text style={{ fontFamily: 'BodyBold', fontSize: 14, lineHeight: 22, color: Colors.light.textSecondary, textAlign: 'center' }}>MORE ABOUT YOUR IDEAL MATCH</Text>
                    <Spacer height={8} />

                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.firstItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Interests</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterBodyType')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Body Type</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.bodyTypePreference.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterStarsign')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Star Sign</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.starSignPreference.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterExerciseFrequency')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Working out</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.exerciseFrequency.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterSmokingFrequency')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Smoking</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.smokingFrequency.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterDrinkingFrequency')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Drinking</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.drinkingFrequency.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterCannabisFrequency')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Cannabis</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.cannabisFrequency.value}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterDietPreference')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Diet</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.dietPreference.value}</Text>
                    </Button>

                </ScrollView>

                <Spacer height={16} />

                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 8 }}>
                    <Button onPress={() => resetSettings()} style={[defaultStyles.button, defaultStyles.buttonShadow, { flex: 1 }]}>
                        <Text style={defaultStyles.buttonLabel}>Reset</Text>
                    </Button>
                    <Button onPress={() => { navigation.goBack() }} style={[defaultStyles.button, defaultStyles.buttonShadow, { flex: 1 }]}>
                        <Text style={defaultStyles.buttonLabel}>Save</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});




```

# app\searchFilters\filterStarsign.tsx

```tsx
import React, { useCallback } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native'

type ItemData = {
    id: string;
    title: string;
};

const DATA: ItemData[] = [
    { id: '1', title: 'Aries' },
    { id: '2', title: 'Taurus' },
    { id: '3', title: 'Gemini' },
    { id: '4', title: 'Cancer' },
    { id: '5', title: 'Leo' },
    { id: '6', title: 'Virgo' },
    { id: '7', title: 'Libra' },
    { id: '8', title: 'Scorpio' },
    { id: '9', title: 'Sagittarius' },
    { id: '10', title: 'Capricorn' },
    { id: '11', title: 'Aquarius' },
    { id: '12', title: 'Pisces' },
];

export default function FilterStarSign() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const handlePress = useCallback((key: string, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            starSignPreference: { key, value }
        }));
        storeData('starSignPreference', { key, value })
            .then(() => {
                console.log('starSignPreference:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save star sign preference:', error));
    }, [setSearchFilters]);

    const renderItem = useCallback(({ item }: { item: typeof DATA[0] }) => {
        const color = item.id === searchFilters.starSignPreference.key ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.title}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={searchFilters.starSignPreference.key === item.id}
                onPress={() => handlePress(item.id, item.title)}
                accessibilityLabel={`Select ${item.title}`}
            />
        );
    }, [searchFilters.starSignPreference, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Star Sign Preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select your preferred star sign for potential matches.</Text>
                <Spacer height={48} />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={searchFilters.starSignPreference}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

// ... styles remain the same ...

const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderRadius: 0,
        borderTopWidth: 0,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },



});

```

# app\searchFilters\filterSmoking.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterSmokingFrequency() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const smokingOptions = useMemo(() => getFieldOptions('smoking_status', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            smokingFrequency: { key: key.toString(), value }
        }));
        storeData('smokingFrequency', { key, value })
            .then(() => {
                console.log('smokingFrequency:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.smokingFrequency?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.smokingFrequency, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Smoking Frequency</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select how much your potential matches are allowed to smoke.</Text>
                <Spacer height={48} />
                <FlatList
                    data={smokingOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.smokingFrequency}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterGenderPreference.tsx

```tsx
import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Button, Checkbox } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData, getData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native'

type ItemData = {
    id: string;
    title: string;
};

const DATA: ItemData[] = [
    { id: '1', title: 'Male' },
    { id: '2', title: 'Female' },
    { id: '3', title: 'Male (Transgender)' },
    { id: '4', title: 'Female (Transgender)' },
    { id: '5', title: 'Non-binary' },
    { id: '6', title: 'Genderqueer' },
    { id: '7', title: 'Genderfluid' },
    { id: '8', title: 'Agender' },
    { id: '9', title: 'Two-Spirit' },
];

export default function FilterGenderPreference() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getSelectedItems = async () => {
            const storedPreference = await getData('genderPreference');
            if (storedPreference && storedPreference.value) {
                setSelectedItems(storedPreference.value);
            }
        };
        getSelectedItems();
    }, []);

    const handlePress = useCallback((itemTitle: string) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(itemTitle)) {
                return prevSelectedItems.filter(title => title !== itemTitle);
            } else {
                return [...prevSelectedItems, itemTitle];
            }
        });
    }, []);

    const handleSave = useCallback(() => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            genderPreference: { key: '', value: selectedItems }
        }));
        storeData('genderPreference', { key: '', value: selectedItems })
            .then(() => {
                console.log('genderPreference:', selectedItems);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save gender preference:', error));
    }, [selectedItems, setSearchFilters]);

    const renderItem = useCallback(({ item }: { item: typeof DATA[0] }) => {
        const isSelected = selectedItems.includes(item.title);
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <Checkbox
                label={item.title}
                size={24}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.checkboxButton, { borderColor: color }]}
                labelStyle={defaultStyles.checkboxButtonLabel}
                value={isSelected}
                onValueChange={() => handlePress(item.title)}
                accessibilityLabel={`Select ${item.title}`}
            />
        );
    }, [selectedItems, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Gender preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select one or more gender preferences.</Text>
                <Spacer height={48} />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedItems}
                    showsVerticalScrollIndicator={false}
                />
                <Spacer height={48} />
                <Button
                    label="Save"
                    onPress={handleSave}
                    style={[defaultStyles.button, defaultStyles.buttonShadow]}
                    labelStyle={defaultStyles.buttonLabel}
                />
            </View>
        </SafeAreaView>
    );
}

// ... styles remain the same ...
const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },



});




```

# app\searchFilters\filterExerciseFrequency.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterExerciseFrequency() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const bodyTypeOptions = useMemo(() => getFieldOptions('exercise_frequency', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            exerciseFrequency: { key: key.toString(), value }
        }));
        storeData('exerciseFrequency', { key, value })
            .then(() => {
                console.log('exerciseFrequency:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.exerciseFrequency?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.exerciseFrequency, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Exercise Frequency</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select how fit your potential matches should be.</Text>
                <Spacer height={48} />
                <FlatList
                    data={bodyTypeOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.exerciseFrequency}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterDrinking.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterDrinkingFrequency() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const drinkingOptions = useMemo(() => getFieldOptions('drinking_status', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            drinkingFrequency: { key: key.toString(), value }
        }));
        storeData('drinkingFrequency', { key, value })
            .then(() => {
                console.log('drinkingFrequency:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.drinkingFrequency?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.drinkingFrequency, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Drinking Frequency</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select how much your potential matches are allowed to drink.</Text>
                <Spacer height={48} />
                <FlatList
                    data={drinkingOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.drinkingFrequency}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterDietPreference.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterDietPreference() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const dietOptions = useMemo(() => getFieldOptions('diet_preference', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            dietPreference: { key: key.toString(), value }
        }));
        storeData('dietPreference', { key, value })
            .then(() => {
                console.log('dietPreference:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.dietPreference?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.dietPreference, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Diet</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select your potential matches diet preference that is in line with you.</Text>
                <Spacer height={48} />
                <FlatList
                    data={dietOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.dietPreference}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterCannabis.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterCannabisFrequency() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const cannabisOptions = useMemo(() => getFieldOptions('cannabis_use', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            cannabisFrequency: { key: key.toString(), value }
        }));
        storeData('cannabisFrequency', { key, value })
            .then(() => {
                console.log('cannabisFrequency:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.cannabisFrequency?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.cannabisFrequency, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Cannabis Frequency</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select how much Cannabis your potential matches are allowed to put in their blood stream.</Text>
                <Spacer height={48} />
                <FlatList
                    data={cannabisOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.cannabisFrequency}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterBodyType.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';
import { getFieldOptions } from '@/lang/profile_details';

export default function FilterBodyType() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const navigation = useNavigation();

    const bodyTypeOptions = useMemo(() => getFieldOptions('body_type', 'en'), []);

    const handlePress = useCallback((key: number, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            bodyTypePreference: { key: key.toString(), value }
        }));
        storeData('bodyTypePreference', { key, value })
            .then(() => {
                console.log('bodyTypePreference:', key, value);
                setTimeout(() => navigation.goBack(), 50);
            })
            .catch(error => console.error('Failed to save body type preference:', error));
    }, [setSearchFilters, navigation]);

    const renderItem = useCallback(({ item }: { item: { key: number; label: string } }) => {
        const isSelected = item.key === searchFilters.bodyTypePreference?.key;
        const color = isSelected ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.label}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={isSelected}
                onPress={() => handlePress(item.key, item.label)}
                accessibilityLabel={`Select ${item.label}`}
            />
        );
    }, [searchFilters.bodyTypePreference, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Body Type Preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select your preferred body type for potential matches.</Text>
                <Spacer height={48} />
                <FlatList
                    data={bodyTypeOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key.toString()}
                    extraData={searchFilters.bodyTypePreference}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}



```

# app\searchFilters\filterAgeRange.tsx

```tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { Button, Slider } from 'react-native-ui-lib';
import { useAppContext } from '@/providers/AppProvider';
import { useNavigation } from '@react-navigation/native';

const MIN_AGE = 18;
const MAX_AGE = 100;

export default function FilterAgeRange() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const [localMinAge, setLocalMinAge] = useState(searchFilters?.ageRange?.min ?? MIN_AGE);
    const [localMaxAge, setLocalMaxAge] = useState(searchFilters?.ageRange?.max ?? MAX_AGE);
    const navigation = useNavigation();

    useEffect(() => {
        if (searchFilters?.ageRange.min && searchFilters?.ageRange.max) {
            const validMinAge = Math.max(MIN_AGE, Math.min(searchFilters.ageRange.min, MAX_AGE));
            const validMaxAge = Math.max(validMinAge, Math.min(searchFilters.ageRange.max, MAX_AGE));
            setLocalMinAge(validMinAge);
            setLocalMaxAge(validMaxAge);
        }
    }, [searchFilters]);

    const handleSliderChange = useCallback((value: any) => {
        setLocalMinAge(value.min);
        setLocalMaxAge(value.max);
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            ageRange: {
                min: value.min,
                max: value.max
            }
        }));
    }, [localMinAge, localMaxAge]);

    const handleSave = useCallback(() => {
        const ageRangeValue = `${localMinAge}-${localMaxAge}`;
        storeData('ageRange', { min: localMinAge, max: localMaxAge })
            .then(() => {
                console.log('ageRange:', ageRangeValue);
                navigation.goBack();
            })
            .catch(error => console.error('Failed to save age range:', error));
    }, [localMinAge, localMaxAge]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={[defaultStyles.innerContainer, { justifyContent: 'space-between' }]}>
                <View>
                    <Text style={defaultStyles.h2}>Age Range</Text>
                    <Spacer height={8} />
                    <Text style={defaultStyles.body}>Set your preferred age range for potential matches.</Text>
                    <Spacer height={48} />
                    <Text style={styles.label}>Age Range: {Math.round(localMinAge)} - {Math.round(localMaxAge)}</Text>
                    <Slider
                        useRange
                        initialMinimumValue={localMinAge}
                        initialMaximumValue={localMaxAge}
                        minimumValue={MIN_AGE}
                        maximumValue={MAX_AGE}
                        onRangeChange={(value) => handleSliderChange(value)}
                        step={2}
                        containerStyle={styles.slider}
                        thumbStyle={styles.thumbStyle}
                        thumbTintColor={Colors.light.accent}
                        minimumTrackTintColor={Colors.light.accent}
                        maximumTrackTintColor={Colors.light.tertiary}

                    />
                </View>

                <View>
                    <Spacer height={48} />
                    <Button
                        label="Save"
                        onPress={handleSave}
                        style={[defaultStyles.button, defaultStyles.buttonShadow]}
                        labelStyle={defaultStyles.buttonLabel}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label: {
        ...defaultStyles.body,
        marginBottom: 8,
    },
    sliderContainer: {
        paddingHorizontal: 16,
    },
    slider: {
        width: '90%',
        height: 40,
        alignSelf: 'center',
    },
    thumbStyle: {
        borderWidth: 4,
        height: 32,
        width: 32,
    },

});
```

# app-example\(tabs)\_layout.tsx

```tsx
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

```

# app-example\(tabs)\index.tsx

```tsx
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

```

# app-example\(tabs)\explore.tsx

```tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

```

# supabase\functions\send-match-notification\index.ts

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function sendPushNotification(pushToken: string, title: string, body: string) {
  const message = {
    to: pushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  }

  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })

  const data = await response.json()
  console.log(data)
  return data
}

serve(async (req) => {
  const { user_id, matched_user_id } = await req.json()

  // Fetch the push token for the user to be notified
  const { data: userData, error: userError } = await supabase
    .from('profiles_test')
    .select('push_token, name')
    .eq('id', user_id)
    .single()

  if (userError || !userData?.push_token) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch user data or push token not found' }),
      { status: 400 }
    )
  }

  // Fetch the name of the user who created the match
  const { data: matchedUserData, error: matchedUserError } = await supabase
    .from('profiles_test')
    .select('name')
    .eq('id', matched_user_id)
    .single()

  if (matchedUserError) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch matched user data' }),
      { status: 400 }
    )
  }

  const notificationTitle = "New Match!"
  const notificationBody = `You have a new match! Open the app to find out who.`

  const result = await sendPushNotification(userData.push_token, notificationTitle, notificationBody)

  return new Response(
    JSON.stringify({ result }),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

# supabase\functions\process-match-notifications\index.ts

```ts
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from process-match function!")

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function sendPushNotification(pushToken: string, title: string, body: string) {
  const message = {
    to: pushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  }

  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })

  return await response.json()
}

Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { data: pendingNotifications, error } = await supabase
    .from('pending_match_notifications')
    .select('*')
    .eq('processed', false)
    .limit(50)
    
  if (error) {
    console.error('Error fetching pending notifications:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch pending notifications' }), { status: 500 })
  }

  for (const notification of pendingNotifications) {
    for (const userId of [notification.user1_id, notification.user2_id]) {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('push_token')
        .eq('id', userId)
        .single()

      if (userError || !userData?.push_token) {
        console.error(`Failed to fetch user data or push token not found for user ${userId}`)
        continue
      }

      const notificationTitle = "New Match!"
      const notificationBody = `You have a new match! Open the app to find out who.`

      try {
        await sendPushNotification(userData.push_token, notificationTitle, notificationBody)
        console.log(`Notification sent to user ${userId}`)
      } catch (error) {
        console.error(`Failed to send notification to user ${userId}:`, error)
      }
    }

    // Mark the notification as processed
    const { error: updateError } = await supabase
      .from('pending_match_notifications')
      .update({ processed: true })
      .eq('id', notification.id)

    if (updateError) {
      console.error(`Failed to mark notification ${notification.id} as processed:`, updateError)
    }
  }

  return new Response(JSON.stringify({ message: 'Notifications processed' }), { status: 200 })
})
```

# supabase\functions\invoke-process-match-notifications\index.ts

```ts
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

console.log("Hello from invoke function!")

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

  const response = await fetch(`${supabaseUrl}/functions/v1/process-match-notifications`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), { status: response.status })
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/invoke-process-match-notifications' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

```

# supabase\functions\generate-stream-token\index.ts

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const STREAM_API_KEY = Deno.env.get('STREAM_API_KEY')
const STREAM_API_SECRET = Deno.env.get('STREAM_API_SECRET')

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error('STREAM_API_KEY or STREAM_API_SECRET is not set')
}

async function JWTUserToken(
  apiSecret: string,
  payload: { user_id: string; exp?: number; iat?: number; }
) {
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(apiSecret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );

  const header = { alg: "HS256", typ: "JWT" };

  if (!payload.iat) {
    payload.iat = getNumericDate(new Date());
  }

  if (!payload.exp) {
    payload.exp = getNumericDate(new Date(Date.now() + 60 * 60 * 1000)); // 1 hour from now
  }

  return await create(header, payload, key);
}

serve(async (req) => {
  try {
    console.log("Request received");
    const { user } = await req.json()
    console.log("User data:", user);

    if (!user || !user.id) {
      console.log("User ID is missing");
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const payload = {
      user_id: user.id,
    };

    console.log("Generating token for user:", user.id);
    const token = await JWTUserToken(STREAM_API_SECRET, payload);
    console.log("Token generated successfully");

    return new Response(
      JSON.stringify({ token }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-stream-token:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})











```

# components\__tests__\__snapshots__\ThemedText-test.tsx.snap

```snap
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders correctly 1`] = `
<Text
  style={
    [
      {
        "color": "#11181C",
      },
      {
        "fontSize": 16,
        "lineHeight": 24,
      },
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]
  }
>
  Snapshot test!
</Text>
`;

```

# assets\images\onboarding\onboarding5@3x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding5@2x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding5.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding4@3x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding4@2x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding4.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding3@3x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding3@2x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding3.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding2@3x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding2@2x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding2.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding1@3x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding1@2x.png

This is a binary file of the type: Image

# assets\images\onboarding\onboarding1.png

This is a binary file of the type: Image

# assets\images\icons\tab-me@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-me@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-me.png

This is a binary file of the type: Image

# assets\images\icons\tab-me-active@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-me-active@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-me-active.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox-active@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox-active@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-inbox-active.png

This is a binary file of the type: Image

# assets\images\icons\tab-home@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-home@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-home.png

This is a binary file of the type: Image

# assets\images\icons\tab-home-active@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-home-active@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-home-active.png

This is a binary file of the type: Image

# assets\images\icons\tab-history@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-history@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-history.png

This is a binary file of the type: Image

# assets\images\icons\tab-history-active@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-history-active@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-history-active.png

This is a binary file of the type: Image

# assets\images\icons\tab-explore@3x.png

This is a binary file of the type: Image

# assets\images\icons\tab-explore@2x.png

This is a binary file of the type: Image

# assets\images\icons\tab-explore.png

This is a binary file of the type: Image

# assets\images\icons\iconSharedInterest@3x.png

This is a binary file of the type: Image

# assets\images\icons\iconSharedInterest@2x.png

This is a binary file of the type: Image

# assets\images\icons\iconSharedInterest.png

This is a binary file of the type: Image

# assets\images\logo\logo_crushy@3x.png

This is a binary file of the type: Image

# assets\images\logo\logo_crushy@2x.png

This is a binary file of the type: Image

# assets\images\logo\logo_crushy.png

This is a binary file of the type: Image

# assets\images\dummies\dummy3.png

This is a binary file of the type: Image

# assets\images\dummies\dummy2.png

This is a binary file of the type: Image

# assets\images\dummies\dummy1.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingLike@3x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingLike@2x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingLike.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingDislike@3x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingDislike@2x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingDislike.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingChat@3x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingChat@2x.png

This is a binary file of the type: Image

# assets\images\buttons\buttonMatchingChat.png

This is a binary file of the type: Image


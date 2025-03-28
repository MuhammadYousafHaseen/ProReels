# ProReels 🎮  

ProReels is a **Next.js-based** video-sharing platform that allows users to upload, manage, and watch short videos. The project integrates **NextAuth** for authentication, **ImageKit** for video/image storage, and MongoDB for database management. The platform is designed with **a responsive UI, dark mode compatibility, and optimized performance**.

## 🚀 Features  

✅ **User Authentication** – Secure login/signup using NextAuth  
✅ **Video Uploading** – Upload videos with thumbnails via ImageKit  
✅ **Video Playback** – Smooth video streaming with optimized quality  
✅ **User Dashboard** – Manage uploaded videos and view personal content  
✅ **Responsive UI** – Fully optimized for mobile and desktop  
✅ **Dark Mode Support** – Seamless theme switching  
✅ **API Integration** – REST API with CRUD operations  

---

## 🛠 Tech Stack  

- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)  
- **Backend:** Next.js API Routes, NextAuth  
- **Database:** MongoDB (Mongoose ORM)  
- **File Storage:** ImageKit (for video and thumbnail storage)  
- **State Management:** React Hooks  
- **Authentication:** NextAuth.js  
- **UI Framework:** Tailwind CSS & ShadCN  

---

## 💀 Folder Structure  

```
ProReels/
│── public/                 # Static assets
│── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── dashboard/      # Dashboard UI
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication logic
│   │   │   ├── video/      # Video upload & fetch API
│   ├── lib/                # Utility functions
│   ├── models/             # Mongoose models (Video, User)
│── .env                    # Environment variables
│── next.config.js          # Next.js configuration
│── package.json            # Dependencies & scripts
```

---

## 🛠 Installation & Setup  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/MuhammadYousafHaseen/ProReels.git
cd ProReels
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Setup environment variables**  
Create a `.env.local` file and add:  
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_IMAGEKIT_URL=your_imagekit_endpoint
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
```

4️⃣ **Run the development server**  
```sh
npm run dev
```
Now visit **http://localhost:3000** 🎉  

---

## 🔒 Authentication  

- **Sign in** via email/password  
- **Session Handling** using NextAuth  
- **Protected Routes** (Dashboard & Video Upload require authentication)  

---

## 📌 API Endpoints  

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| `POST` | `/api/auth/login`    | User login               |
| `POST` | `/api/auth/signup`   | User registration        |
| `GET`  | `/api/auth/session`  | Check session            |
| `POST` | `/api/video`         | Upload a new video       |
| `GET`  | `/api/video`         | Fetch all videos         |
| `GET`  | `/api/video/:id`     | Fetch a single video     |

---

## 🎥 Video Upload Flow  

1️⃣ User selects a video & thumbnail  
2️⃣ The video is uploaded to ImageKit  
3️⃣ The database is updated with the video info  
4️⃣ Video is displayed on the homepage  

---

## 🎨 UI/UX Features  

- **Dark Mode** 🌙  
- **Optimized for Mobile** 📱  
- **Hover Effects on Videos** 🎥  
- **Fast Page Navigation** ⚡  

---

## 👥 Contributing  

1️⃣ **Fork the repo**  
2️⃣ **Create a branch**: `git checkout -b feature-branch`  
3️⃣ **Make changes & commit**: `git commit -m "Added new feature"`  
4️⃣ **Push changes**: `git push origin feature-branch`  
5️⃣ **Create a Pull Request** 🚀  

---

## 💡 Future Improvements  

- 🔄 **Video Categories & Tags**  
- 🔔 **User Notifications**  
- 📊 **Analytics Dashboard**  
- 💬 **Commenting & Likes System**  

---

## 📄 License  

MIT License © 2025 Muhammad Yousaf Haseen  

---


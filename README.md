# Teachers Tribute Website

A beautiful React web application to honor your computer engineering teachers with personalized video tributes. Each teacher has their own route that displays a carousel of tribute videos dynamically fetched from Google Drive.

## Features

- **Dynamic Routing**: Each teacher has their own dedicated page (`/teacher/teachername`)
- **Video Carousel**: Smooth navigation through multiple tribute videos
- **Google Drive Integration**: Automatically fetches videos from teacher-specific folders
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Engineering Theme**: Beautiful background with engineering-inspired design elements
- **No Rebuild Required**: Videos are loaded dynamically - just upload to Drive!

## Teachers Included

- Cleo
- Pedro
- Dalmazo
- Bicho
- Victor
- Berri
- André
- Schvittz

## Quick Start

1. **Clone and Install**

   ```bash
   git clone <your-repo-url>
   cd graduation-teachers-tribute
   npm install
   ```

2. **Development Mode**

   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Google Drive Setup (Production)

To enable dynamic video loading from Google Drive:

### 1. Create Google Drive API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Drive API
4. Create credentials (API Key) for public access
5. Note your API key

### 2. Set Up Drive Folders

1. Create a root folder in your Google Drive for all teachers
2. Inside the root folder, create a folder for each teacher with their exact name (case-insensitive):

   - `cleo`
   - `pedro`
   - `dalmazo`
   - `bicho`
   - `vitor`
   - `berri`
   - `andré`
   - `schvittz`

3. Make folders publicly accessible:
   - Right-click folder → Share
   - Change to "Anyone with the link"
   - Set permission to "Viewer"

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_DRIVE_API_KEY=your_api_key_here
VITE_DRIVE_ROOT_FOLDER_ID=your_root_folder_id_here
```

Note: Vite requires environment variables to start with `VITE_` prefix to be accessible in the application.

### 4. Update the Drive Service

In `src/services/driveService.js`, uncomment the production code and remove the mock data section.

## Video Upload Process

1. Record tribute videos (MP4 format recommended)
2. Upload to the corresponding teacher's Google Drive folder
3. Videos will automatically appear on the teacher's tribute page
4. No website rebuild or redeployment required!

## Project Structure

```
src/
├── components/
│   ├── VideoCarousel.jsx      # Video carousel component
│   └── VideoCarousel.css      # Carousel styling
├── pages/
│   ├── HomePage.jsx           # Teacher selection page
│   ├── HomePage.css           # Homepage styling
│   ├── TeacherTribute.jsx     # Individual teacher tribute page
│   └── TeacherTribute.css     # Tribute page styling
├── services/
│   └── driveService.js        # Google Drive API integration
└── App.jsx                    # Main routing component
```

## Customization

### Adding New Teachers

1. Add the teacher's name to the `teachers` array in `src/pages/HomePage.jsx`
2. Create a corresponding Google Drive folder
3. Add mock data entry in `driveService.js` for development

### Styling Changes

- Main theme colors in `src/App.css`
- Homepage styling in `src/pages/HomePage.css`
- Tribute page styling in `src/pages/TeacherTribute.css`
- Carousel styling in `src/components/VideoCarousel.css`

### Video Format Support

The application supports any video format that Google Drive can preview in embed mode:

- MP4 (recommended)
- MOV
- AVI
- WMV

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy!

## Development Notes

- The app currently uses mock data for development
- Replace mock data with actual Google Drive API calls for production
- Video URLs should be in the format: `https://drive.google.com/file/d/FILE_ID/preview`
- Ensure all Google Drive folders have proper sharing permissions

## Troubleshooting

### Videos Not Loading

- Check Google Drive folder permissions
- Verify API key is correct
- Ensure folder names match teacher names exactly
- Check browser console for error messages

### Responsive Issues

- Test on multiple devices
- Check CSS media queries
- Verify viewport meta tag in index.html

## Contributing

Feel free to contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is created for educational purposes to honor amazing teachers. Use freely for similar tribute projects!

---

**Created with ❤️ for the Computer Engineering Class of 2025**

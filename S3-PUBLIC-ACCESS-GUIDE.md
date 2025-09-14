# S3 Public Access Configuration Guide

## Current Implementation Status ✅

Your upload code is already configured to make videos publicly accessible:

- `ACL: 'public-read'` is set in the PutObjectCommand
- Public URLs are generated using the standard S3 format
- Videos should be accessible via direct URLs

## Required S3 Bucket Configuration

### 1. Block Public Access Settings

Your S3 bucket must have the correct Block Public Access settings:

**Via AWS Console:**

1. Go to S3 → Your bucket → Permissions
2. Edit "Block public access (bucket settings)"
3. **UNCHECK** these options:
   - ❌ Block public access to buckets and objects granted through new access control lists (ACLs)
   - ❌ Block public access to buckets and objects granted through any access control lists (ACLs)
4. Keep these CHECKED for security:
   - ✅ Block public access to buckets and objects granted through new public bucket or access point policies
   - ✅ Block public access to buckets and objects granted through any public bucket or access point policies

**Via AWS CLI:**

```bash
aws s3api put-public-access-block \
    --bucket graduation-teachers-tribute \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### 2. Bucket Policy (Alternative Approach)

If ACLs don't work, you can use a bucket policy instead:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::graduation-teachers-tribute/*"
    }
  ]
}
```

### 3. CORS Configuration (Already covered but important)

Make sure your CORS policy allows GET requests:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Testing Public Access

### Method 1: Direct URL Test

After uploading a video, test the generated URL in an incognito browser:

```
https://graduation-teachers-tribute.s3.us-east-1.amazonaws.com/teachername/video.mp4
```

### Method 2: AWS CLI Test

```bash
aws s3api get-object-acl --bucket graduation-teachers-tribute --key teachername/video.mp4
```

Should show `"Grantee": { "Type": "Group", "URI": "http://acs.amazonaws.com/groups/global/AllUsers" }`

## Common Issues & Solutions

### Issue: "Access Denied" when accessing video URLs

**Solution:** Check Block Public Access settings and ensure ACLs are allowed

### Issue: ACL errors during upload

**Solution:** Either fix Block Public Access settings OR remove ACL and use bucket policy instead

### Issue: Videos upload but aren't accessible

**Solution:** Check both bucket permissions and individual object ACLs

## Fallback: Remove ACL and Use Bucket Policy

If ACL approach doesn't work, we can modify the upload code:

```javascript
// Remove ACL from upload command
const command = new PutObjectCommand({
  Bucket: S3_BUCKET_NAME,
  Key: key,
  Body: file,
  ContentType: file.type,
  // ACL: 'public-read' // Remove this line
});
```

Then apply the bucket policy above to make everything in the bucket publicly readable.

## Security Note

Public access means anyone with the URL can view the videos. This is typically desired for tribute videos, but ensure this aligns with your privacy requirements.

const user = auth.currentUser;

const newDocRef = doc(collection(db, "Image"));

try {
    await setDoc(newDocRef, {
        url: imageURL,
        tag,
        name,
        imgId: newDocRef.id,
        likes: [likeCount],
        uploadedBy: user.uid || "unknown",
    });
} catch (error) {
    console.error("Upload failed:", error);
} finally {
    setIsOpen(false);
}
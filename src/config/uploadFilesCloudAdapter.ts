import { utilsFirebase } from "./firebaseAdapter";

export class UploadFile {
  static async uploadToCloud(path: any, data: any) {
    const imgRef = utilsFirebase.ref(utilsFirebase.storage, path);
    await utilsFirebase.uploadBytes(imgRef, data);

    return await utilsFirebase.getDownloadURL(imgRef);
  }
}

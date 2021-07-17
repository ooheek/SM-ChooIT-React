import { ReviewPhotoUpload } from '../../services'

export default class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  async upload() {
    const file = await this.loader.file
    const result = await ReviewPhotoUpload(file)

    const url = new URL(result.data.img_path)
    const filename = url.pathname

    const imgArr = {
      img_no: result.data.img_no,
      img_path: filename,
    }
    const imgList = window.sessionStorage.getItem('_img_no')
    if (imgList) {
      window.sessionStorage.setItem(
        '_img_no',
        JSON.stringify([...JSON.parse(imgList), imgArr]),
      )
    } else {
      window.sessionStorage.setItem('_img_no', JSON.stringify([imgArr]))
    }

    return {
      default: result.data.img_path,
    }
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }
}

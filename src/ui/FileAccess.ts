import { fileOpen, fileSave } from "browser-fs-access"
export default {
  async open() {
    const file = await fileOpen({ extensions: [".txt"] })
    return await file.text()
  },
  async save(content: string) {
    await fileSave(new Blob([content]), { extensions: [".txt"] })
  },
}

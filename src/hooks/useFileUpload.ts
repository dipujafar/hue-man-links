import { Error_Modal } from "@/components/modals/modals";
import { useUploadFileMutation } from "@/redux/api/fileUploadApi";
import { TError } from "@/types";

const useFileUpload = () => {
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      return await uploadFile(formData).unwrap();
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };
  return [upload, isUploading];
};
export default useFileUpload;
